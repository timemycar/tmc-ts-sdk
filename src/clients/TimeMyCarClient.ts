import AbstractClient from '../classes/AbstractClient';
import { Command } from '../command/Command';
import { TimeMyCarClientConfig } from '../config/TimeMyCarClientConfig';

export class TimeMyCarClient extends AbstractClient {
	constructor(config: TimeMyCarClientConfig) {
		super(config);
	}

	async send<T>(command: Command): Promise<NonNullable<T>> {
		return super.send<T>(command);
	}
}
