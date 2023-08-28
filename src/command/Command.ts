import { RequestMethod } from '../enums/RequestMethod';
import ICommand from '../interfaces/ICommand';
import ICommandBuilder from '../interfaces/ICommandBuilder';

/**
 * Commands for the TimeMyCar Client.
 */
export class Command implements ICommand {
	method: RequestMethod;
	jwt: string;
	path: string;
	params: object;

	static DEFAULT_METHOD = RequestMethod.POST;
	static DEFAULT_JWT = 'NO-AUTH';
	static DEFAULT_PATH = '';
	static DEFAULT_PARAMS = new Object();

	constructor() {
		this.method = Command.DEFAULT_METHOD;
		this.jwt = Command.DEFAULT_JWT;
		this.path = Command.DEFAULT_PATH;
		this.params = Command.DEFAULT_PARAMS;
	}

	static builder() {
		return new CommandBuilder();
	}
}

/**
 * Builder for the Command.
 */
class CommandBuilder implements ICommandBuilder<Command> {
	private command: Command;

	constructor() {
		this.command = new Command();
	}

	/**
	 * Sets the command method.
	 *
	 * @default
	 * RequestType.POST;
	 *
	 * @param method    Command Method;
	 * @returns
	 */
	withMethod(method: RequestMethod): CommandBuilder {
		this.command.method = method;
		return this;
	}

	/**
	 * Sets the JWT Authorization Token.
	 *
	 * @default "NO-AUTH"
	 *
	 * @param jwt       JWT Authorization Token.
	 * @returns
	 */
	withJwt(jwt: string): CommandBuilder {
		this.command.jwt = jwt;
		return this;
	}

	/**
	 * Sets the Command Path
	 *
	 * @default Empty String
	 *
	 * @param path      RPC Command Path
	 * @returns
	 */
	withPath(path: string): CommandBuilder {
		this.command.path = path;
		return this;
	}

	/**
	 * Sets the Params Field
	 *
	 * @default
	 * new Object();
	 *
	 * @param params    Command Params
	 * @returns
	 */
	withParams(params: object): CommandBuilder {
		this.command.params = params;
		return this;
	}

	/**
	 * Builds the AccountCommand
	 *
	 * @returns         Command Object
	 */
	build(): Command {
		return this.command;
	}
}
