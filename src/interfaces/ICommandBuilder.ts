import { RequestMethod } from '../enums/RequestMethod';

export default interface ICommandBuilder<T> {
	withMethod(method: RequestMethod): ICommandBuilder<T>;
	withJwt(jwt: string): ICommandBuilder<T>;
	withPath(path: string): ICommandBuilder<T>;
	withParams(params: object): ICommandBuilder<T>;
	build(): T;
}
