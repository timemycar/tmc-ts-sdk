import { AccountClient, AccountClientConfig } from '../../src/clients/AccountClient';

let config: AccountClientConfig;
const endpoint = "endpoint";
const timeout = 4000;

beforeAll(() => {
    /** Generates the Client Config. */
    config = AccountClientConfig.builder()
        .withEndpoint(endpoint)
        .withTimeout(timeout)
        .build();
})

test('Defines Client', () => {
    const account = new AccountClient(config);

    expect(account).toBeDefined();
})

test('Assigns Endpoint on Client Construction', () => {
    const account = new AccountClient(config);

    expect(account.endpoint).toBe(endpoint);
})

test('Assigns Timeout on Client Construction', () => {
    const account = new AccountClient(config);

    expect(account.timeout).toBe(timeout);
})