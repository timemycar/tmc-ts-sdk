import { RequestMethod } from "../enums/RequestMethod";
import ICommand from "../interfaces/ICommand";
import ICommandBuilder from "../interfaces/ICommandBuilder";



/**
 * Commands for the Account Client.
 */
export class AccountCommand implements ICommand {
    method: RequestMethod;
    jwt: string;
    path: string;
    params: Object;

    static DEFAULT_METHOD = RequestMethod.POST;
    static DEFAULT_JWT = "NO-AUTH";
    static DEFAULT_PATH = "";
    static DEFAULT_PARAMS = new Object();

    constructor() {
        this.method = AccountCommand.DEFAULT_METHOD;
        this.jwt = AccountCommand.DEFAULT_JWT;
        this.path = AccountCommand.DEFAULT_PATH;
        this.params = AccountCommand.DEFAULT_PARAMS;
    }

    static builder() {
        return new AccountCommandBuilder();
    }
    
}

/**
 * Builder for the AccountCommand.
 */
class AccountCommandBuilder implements ICommandBuilder<AccountCommand> {
    private command: AccountCommand;

    constructor() {
        this.command = new AccountCommand();
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
    withMethod(method: RequestMethod): AccountCommandBuilder {
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
    withJwt(jwt: string): AccountCommandBuilder {
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
    withPath(path: string): AccountCommandBuilder {
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
    withParams(params: Object): AccountCommandBuilder {
        this.command.params = params;
        return this;
    }

    /**
     * Builds the AccountCommand
     * 
     * @returns         Command Object
     */
    build(): AccountCommand {
        return this.command;
    }
    
}