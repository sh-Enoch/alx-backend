// connect to redis server running on my machine
import redis from 'redis';
import { promisify } from 'util';

const client = createClient();
const getAsync = promisify(client.get).bind(client);

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

const displaySchoolValue = async (schoolName) => {
	const value = await getAsync(schoolName);
	console.log(value);
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
