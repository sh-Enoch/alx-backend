import kue from 'kue';

const queue = kue.createQueue();

const jobData = {
	phoneNumber: '+1234567890',
	message: 'Hello, this is a notification!',
};

// create and save new job to the queue
const job = queue.create('push_notification_code', jobData).save((err) => {
	if (!err) {
		console.log(`Notification job created: ${job.id}`);
	} else {
		console.error('Error creating job:', err);
	}
});

// handle job failure
job.on('failed', (err) => {
	console.error(`Notification job failed: ${job.id}`, err);
});

// handle job completion
job.on('complete', () => {
	console.log(`Notification job completed`);
});
