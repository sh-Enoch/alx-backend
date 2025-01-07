// Import necessary libraries and modules
import kue from 'kue';
import { expect } from 'chai';
import createPushNotificationsJobs from './8-job.js';

// Describe the test suite for createPushNotificationsJobs function
describe('createPushNotificationsJobs', () => {
	let queue;

	// Before each test, enter the test mode and create a queue
	beforeEach(() => {
		queue = kue.createQueue();
		queue.testMode.enter();
	});

	// After each test, clear the queue and exit the test mode
	afterEach(() => {
		queue.testMode.clear();
		queue.testMode.exit();
	});

	// Test cases
	it('should add jobs to the queue when jobs is an array', () => {
		const jobs = [
			{ phoneNumber: '1234567890', message: 'Message 1' },
			{ phoneNumber: '0987654321', message: 'Message 2' },
		];

		createPushNotificationsJobs(jobs, queue);

		// Validate that the jobs have been added to the queue
		expect(queue.testMode.jobs.length).to.equal(2);
		expect(queue.testMode.jobs[0].type).to.equal('push_notification_code');
		expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
		expect(queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);
	});

	// Additional tests can be added here
});
