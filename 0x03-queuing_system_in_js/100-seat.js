const express = require('express');
const kue = require('kue');
const redis = require('redis');
const util = require('util');

const redisClient = redis.createClient();
const reserveSeatQueue = kue.createQueue({ redis: redisClient });

const getCurrentAvailableSeats = util
	.promisify(redisClient.get)
	.bind(redisClient);
const setAvailableSeats = util.promisify(redisClient.set).bind(redisClient);

let reservationEnabled = true;
let availableSeats = 50;

(async () => {
	await setAvailableSeats('available_seats', availableSeats);
})();

const app = express();

app.get('/available_seats', async (req, res) => {
	const currentSeats = await getCurrentAvailableSeats('available_seats');
	res.json({ numberOfAvailableSeats: currentSeats || 0 });
});

app.get('/reserve_seat', async (req, res) => {
	if (!reservationEnabled) {
		return res.json({ status: 'Reservation are blocked' });
	}

	const reserveSeatJob = reserveSeatQueue.create('reserve_seat', {});

	try {
		await reserveSeatJob.save();
		res.json({ status: 'Reservation in process' });
	} catch (error) {
		console.error('Failed to create reserve seat job:', error.message);
		res.json({ status: 'Reservation failed' });
	}
});

reserveSeatQueue.process('reserve_seat', async (job, done) => {
	try {
		const currentSeats = parseInt(
			await getCurrentAvailableSeats('available_seats'),
			10
		);
		if (currentSeats <= 0) {
			reservationEnabled = false;
			return done(new Error('Not enough seats available'));
		}

		await setAvailableSeats('available_seats', currentSeats - 1);
		availableSeats = currentSeats - 1;
		console.log(`Seat reservation job ${job.id} completed`);
		done();
	} catch (error) {
		console.error(`Seat reservation job ${job.id} failed: ${error.message}`);
		done(error);
	}
});

app.get('/process', async (req, res) => {
	res.json({ status: 'Queue processing' });
	await reserveSeatQueue.active();
});

app.listen(1245, () => console.log('Server listening on port 1245'));
