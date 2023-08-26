import { AccountClient } from '../../src/clients/AccountClient';
import { AccountClientConfig } from '../../src/config/AccountClientConfig';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { AccountService } from '../../src/services/AccountService';
import { AccountCommand } from '../../src';
import { RequestMethod } from '../../src/enums/RequestMethod';

const defaultEndpoint = AccountClientConfig.DEFAULT_ENDPOINT;
const defaultTimeout = AccountClientConfig.DEFAULT_TIMEOUT;
const config = AccountClientConfig.builder().build();

// API Constants
const testId = 'sample-id';
const testPostBody = { testId: testId };
const testGetBody = new Array();

// API Call Interceptor
const server = setupServer(
	// Test Post Call
	rest.post(defaultEndpoint + AccountService.ACCOUNT_PATH + '/test/post', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(testPostBody));
	}),

	// Test Get Call
	rest.get(defaultEndpoint + AccountService.ACCOUNT_PATH + '/test/get', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(testGetBody));
	})
);

describe('Account Client Creation', () => {
	test('Defines Client', () => {
		const account = new AccountClient(config);

		expect(account).toBeDefined();
	});

	test('Assigns Client Properties from Config', () => {
		// This basically just makes sure the constructor is correctly invoking the config one.
		const account = new AccountClient(config);

		expect(account).toHaveProperty('endpoint', defaultEndpoint);
		expect(account).toHaveProperty('timeout', defaultTimeout);
	});
});

describe('Account Client Send', () => {
	beforeAll(() => server.listen());

	afterEach(() => server.resetHandlers());

	afterAll(() => server.close());

	test('Test POST', async () => {
		const account = new AccountClient(config);

		const command = AccountCommand.builder()
			.withMethod(RequestMethod.POST)
			.withPath(AccountService.ACCOUNT_PATH + '/test/post')
			.build();

		const res = await account.send(command);
		expect(res).toStrictEqual(testPostBody);
	});

	test('Test GET', async () => {
		const account = new AccountClient(config);

		const command = AccountCommand.builder()
			.withMethod(RequestMethod.GET)
			.withPath(AccountService.ACCOUNT_PATH + '/test/get')
			.build();

		const res = await account.send(command);
		expect(res).toStrictEqual(testGetBody);
	});
});
