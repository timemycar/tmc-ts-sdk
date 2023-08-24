export default interface ICommand {
    method: RequestMethod,
    authorization: boolean,
    endpoint: string,
    params: Object
}