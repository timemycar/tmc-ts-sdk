import ICommand from "../interfaces/ICommand";
import { RequestMethod } from "../enums/RequestMethod"
import { AccountCommand } from "../command/AccountCommand";

const accountPath = "/api/v1/account"

export function OrganizationCreateCall() {

}

export function OrganizationListCall() {
    const command = AccountCommand.builder()
        .withMethod(RequestMethod.GET)
        .withPath(accountPath + "/organization/list")
        .build();

    return command;
}

export function UserCreateCall(userEmail: string, firstName: string, lastName: string, plainPassword: string): ICommand {
    // Construct Params Object.
    const paramsObject:any = new Object;
    paramsObject["userEmail"] = userEmail;
    paramsObject["firstName"] = firstName;
    paramsObject["lastName"] = lastName;
    paramsObject["plainPassword"] = plainPassword;

    const command = AccountCommand.builder()
        .withMethod(RequestMethod.POST)
        .withPath(accountPath + "/user/create")
        .withParams(paramsObject)
        .build();

    return command;
}

export function UserLoginCall(userEmail:string, plainPassword: string): ICommand {
    // Construct Params Object.
    const paramsObject:any = new Object;
    paramsObject["userEmail"] = userEmail;
    paramsObject["plainPassword"] = plainPassword;

    const command = AccountCommand.builder()
        .withMethod(RequestMethod.POST)
        .withPath(accountPath + "/user/login")
        .withParams(paramsObject)
        .build();

    return command;
}