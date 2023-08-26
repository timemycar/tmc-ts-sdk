import AbstractClient from '../classes/AbstractClient';
import { AccountCommand } from '../command/AccountCommand';
import { AccountClientConfig } from '../config/AccountClientConfig';

export class AccountClient extends AbstractClient {
	constructor(config: AccountClientConfig) {
		super(config);
	}

	async send(command: AccountCommand): Promise<any> {
		return super.send(command);
	}
}
