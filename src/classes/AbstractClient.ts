import axios, { AxiosRequestConfig } from 'axios';
import { RequestMethod } from '../enums/RequestMethod';
import IClientConfig from '../interfaces/IClientConfig';
import { Command } from '../command/Command';

export default abstract class AbstractClient {
	readonly endpoint: string;
	readonly timeout: number;

	constructor(config: IClientConfig) {
		this.endpoint = config['endpoint'];
		this.timeout = config['timeout'];
	}

	/**
	 * Abstract Client Send.
	 *
	 * @param command
	 * @returns
	 */
	async send<T>(command: Command): Promise<NonNullable<T>> {
		let config: AxiosRequestConfig<object> = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		};

		if (command.jwt !== Command.DEFAULT_JWT) {
			config = {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-JWT-Auth': command.jwt
				}
			};
		}

		switch (command.method) {
			default:
			case RequestMethod.POST: {
				const response = await axios.post(this.endpoint + command.path, command.params, config);
				return response.data;
			}

			case RequestMethod.GET: {
				const response = await axios.get(this.endpoint + command.path, config);
				return response.data;
			}
		}
	}
}
