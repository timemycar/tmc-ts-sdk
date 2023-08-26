import IClientConfig from "../interfaces/IClientConfig";
import ICommand from "../interfaces/ICommand";
import IResponse from "../interfaces/IResponse";

export default abstract class AbstractClient {
    readonly endpoint:string;
    readonly timeout:number;

    constructor(config: IClientConfig) {
        this.endpoint = config["endpoint"];
        this.timeout = config["timeout"];
    }


    send(command: ICommand) {
        throw new Error("Override and Implemenet this Method.");
    }
}