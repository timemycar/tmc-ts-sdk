import IClient from "../interfaces/IClient";
import ICommand from "../interfaces/ICommand";
import IResponse from "../interfaces/IResponse";

export default class AccountClient implements IClient {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    send(command: ICommand): IResponse {
        throw new Error("Method not implemented.");
    }
}

export * from "../services/AccountService";