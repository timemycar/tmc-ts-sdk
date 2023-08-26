import axios from 'axios';
import { RequestMethod } from '../enums/RequestMethod';
import IClientConfig from '../interfaces/IClientConfig';
import ICommand from '../interfaces/ICommand';

export default abstract class AbstractClient {
	readonly endpoint: string;
	readonly timeout: number;

	constructor(config: IClientConfig) {
		this.endpoint = config['endpoint'];
		this.timeout = config['timeout'];
	}

	async send(command: ICommand): Promise<any> {
		switch (command.method) {
			default:
			case RequestMethod.POST: {
				const response = await axios.post(this.endpoint + command.path, command.params, {
					headers: {
						'X-JWT-Auth': command.jwt
					}
				});

				return response.data;
			}

			case RequestMethod.GET: {
				const response = await axios.get(this.endpoint + command.path, {
					headers: {
						'X-JWT-Auth': command.jwt
					}
				});

				return response.data;
			}
		}
	}
}
