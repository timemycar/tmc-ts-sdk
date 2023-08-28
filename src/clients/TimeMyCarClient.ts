import AbstractClient from '../classes/AbstractClient';
import { Command } from '../command/Command';
import { TimeMyCarClientConfig } from '../config/TimeMyCarClientConfig';

export class TimeMyCarClient extends AbstractClient {
	constructor(config: TimeMyCarClientConfig) {
		super(config);
	}

	async send(command: Command): Promise<NonNullable<object>> {
		return super.send(command);
	}
}
