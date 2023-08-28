import { RequestMethod } from '../enums/RequestMethod';

export default interface ICommand {
	method: RequestMethod;
	jwt: string;
	path: string;
	params: object;
}
