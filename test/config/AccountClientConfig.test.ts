import { AccountClientConfig } from '../../src/config/AccountClientConfig';

const defaultEndpoint = AccountClientConfig.DEFAULT_ENDPOINT;
const defaultTimeout = AccountClientConfig.DEFAULT_TIMEOUT;

const newEndpoint = 'abcdef';
const newTimeout = 5000;

test('Default Config', () => {
	const config = AccountClientConfig.builder().build();

	expect(config.endpoint).toBe(defaultEndpoint);
	expect(config.timeout).toBe(defaultTimeout);
});

test('Fully Modified Config', () => {
	const config = AccountClientConfig.builder()
		.withEndpoint(newEndpoint)
		.withTimeout(newTimeout)
		.build();

	expect(config.endpoint).toBe(newEndpoint);
	expect(config.timeout).toBe(newTimeout);
});
