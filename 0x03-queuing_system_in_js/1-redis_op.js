// connect to redis server running on my machine
import { createClient } from 'redis';
import redis from 'redis';

const client = createClient();

client.on('connect', () => {
	console.log('Redis client connected to the server');
});

client.on('error', (err) => {
	console.log(`Redis client not connected to the server: ${err}`);
});

const setNewSchool = (schoolName, value) => {
	client.set(schoolName, value, (err, value) => {
		if (err) throw err;
		redis.print(`Reply: ${value}`);
	});
};

const displaySchoolValue = (schoolName) => {
	client.get(schoolName, (err, value) => {
		if (err) throw err;
		redis.print(value);
	});
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
