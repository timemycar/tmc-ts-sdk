import AbstractClient from "../classes/AbstractClient";
import { AccountCommand } from "../command/AccountCommand";
import { AccountClientConfig } from "../config/AccountClientConfig";
import ICommand from "../interfaces/ICommand";
import IResponse from "../interfaces/IResponse";
import axios from "axios";

export class AccountClient extends AbstractClient {
    constructor(config: AccountClientConfig) {
        super(config);
    }

    send(command: AccountCommand) {

    }
}

export * from "../services/AccountService";
export * from "../config/AccountClientConfig";