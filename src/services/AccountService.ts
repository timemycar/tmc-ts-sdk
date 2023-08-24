import ICommand from "../interfaces/ICommand";
import { RequestMethod } from "../enums/RequestMethod"

const accountGateway = "/api/v1/account"

export function OrganizationCreateCall() {

}

export function OrganizationListCall() {
    const command = {} as ICommand;
    command.method = RequestMethod.GET;
    command.authorization = false;
    command.endpoint = accountGateway + "/organization/list"

    // No Params.
    command.params = new Object();

    return command;
}

export function UserCreateCall(userEmail: string, firstName: string, lastName: string, plainPassword: string): ICommand {
    const command = {} as ICommand;
    // Construct Command.
    command.method = RequestMethod.POST;
    command.authorization = false;
    command.endpoint = accountGateway + "/user/create"
    
    // Construct Params Object.
    const paramsObject:any = new Object;
    paramsObject["userEmail"] = userEmail;
    paramsObject["firstName"] = firstName;
    paramsObject["lastName"] = lastName;
    paramsObject["plainPassword"] = plainPassword;

    command.params = paramsObject;

    return command;
}

export function UserLoginCall(userEmail:string, plainPassword: string): ICommand {
    const command = {} as ICommand;
    // Construct Command.
    command.method = RequestMethod.POST;
    command.authorization = false;
    command.endpoint = accountGateway + "/user/login"
    
    // Construct Params Object.
    const paramsObject:any = new Object;
    paramsObject["userEmail"] = userEmail;
    paramsObject["plainPassword"] = plainPassword;

    command.params = paramsObject;

    return command;
}