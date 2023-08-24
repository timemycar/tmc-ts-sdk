import ICommand from "./ICommand";
import IResponse from "./IResponse";

export default interface IClient {
    endpoint: string,
    send(command: ICommand): IResponse
}