import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { TimeMyCarClient, TimeMyCarClientConfig, Command, RequestMethod } from '../../src';

const defaultEndpoint = TimeMyCarClientConfig.DEFAULT_ENDPOINT;
const defaultTimeout = TimeMyCarClientConfig.DEFAULT_TIMEOUT;
const config = TimeMyCarClientConfig.builder().build();

// API Constants
const testId = 'sample-id';
const testPostBody = { testId: testId };
const testGetBody = new Array();

// API Call Interceptor
const server = setupServer(
	// Test Post Call
	rest.post(defaultEndpoint + '/test/post', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(testPostBody));
	}),

	// Test Get Call
	rest.get(defaultEndpoint + '/test/get', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(testGetBody));
	})
);

describe('TimeMyCar Client Creation', () => {
	test('Defines Client', () => {
		const client = new TimeMyCarClient(config);

		expect(client).toBeDefined();
	});

	test('Assigns Client Properties from Config', () => {
		// This basically just makes sure the constructor is correctly invoking the config one.
		const client = new TimeMyCarClient(config);

		expect(client).toHaveProperty('endpoint', defaultEndpoint);
		expect(client).toHaveProperty('timeout', defaultTimeout);
	});
});

describe('TimeMyCar Client Send', () => {
	beforeAll(() => server.listen());

	afterEach(() => server.resetHandlers());

	afterAll(() => server.close());

	test('Test POST', async () => {
		const client = new TimeMyCarClient(config);

		const command = Command.builder().withMethod(RequestMethod.POST).withPath('/test/post').build();

		const res = await client.send(command);
		expect(res).toStrictEqual(testPostBody);
	});

	test('Test GET', async () => {
		const client = new TimeMyCarClient(config);

		const command = Command.builder().withMethod(RequestMethod.GET).withPath('/test/get').build();

		const res = await client.send(command);
		expect(res).toStrictEqual(testGetBody);
	});
});
