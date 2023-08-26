import { TimeMyCarClientConfig } from '../../src';

const defaultEndpoint = TimeMyCarClientConfig.DEFAULT_ENDPOINT;
const defaultTimeout = TimeMyCarClientConfig.DEFAULT_TIMEOUT;

const newEndpoint = 'abcdef';
const newTimeout = 5000;

test('Default Config', () => {
	const config = TimeMyCarClientConfig.builder().build();

	expect(config.endpoint).toBe(defaultEndpoint);
	expect(config.timeout).toBe(defaultTimeout);
});

test('Fully Modified Config', () => {
	const config = TimeMyCarClientConfig.builder()
		.withEndpoint(newEndpoint)
		.withTimeout(newTimeout)
		.build();

	expect(config.endpoint).toBe(newEndpoint);
	expect(config.timeout).toBe(newTimeout);
});
