import { RequestMethod } from '../enums/RequestMethod';
import { AccountCommand } from '../command/AccountCommand';

export class AccountService {
	static ACCOUNT_PATH = '/api/v1/account';
}

/**
 * Command for creating an Organization on TimeMyCar.
 *
 * @param organizationName      Organization Name.
 * @param jwt                   JWT Auth Token.
 * @returns                     Organization Create Command.
 */
export function OrganizationCreateCall(organizationName: string, jwt: string): AccountCommand {
	const paramsObject: any = new Object();
	paramsObject['name'] = organizationName;

	const command = AccountCommand.builder()
		.withMethod(RequestMethod.POST)
		.withJwt(jwt)
		.withPath(AccountService.ACCOUNT_PATH + '/organization/create')
		.withParams(paramsObject)
		.build();

	return command;
}

/**
 * Command for getting a list of Organizations on TimeMyCar.
 *
 * @returns                 Organization List Command.
 */
export function OrganizationListCall(): AccountCommand {
	const command = AccountCommand.builder()
		.withMethod(RequestMethod.GET)
		.withPath(AccountService.ACCOUNT_PATH + '/organization/list')
		.build();

	return command;
}

/**
 * Command for creating a TimeMyCar User.
 *
 *
 * @param userEmail         User E-Mail.
 * @param firstName         User's First Name.
 * @param lastName          User's Last Name.
 * @param plainPassword     User's Password (cleartext)
 * @returns                 User Creation Command.
 */
export function UserCreateCall(
	userEmail: string,
	firstName: string,
	lastName: string,
	plainPassword: string
): AccountCommand {
	// Construct Params Object.
	const paramsObject: any = new Object();
	paramsObject['userEmail'] = userEmail;
	paramsObject['firstName'] = firstName;
	paramsObject['lastName'] = lastName;
	paramsObject['plainPassword'] = plainPassword;

	const command = AccountCommand.builder()
		.withMethod(RequestMethod.POST)
		.withPath(AccountService.ACCOUNT_PATH + '/user/create')
		.withParams(paramsObject)
		.build();

	return command;
}

/**
 * Command for logging in as a TimeMyCar User.
 *
 * @param userEmail         User E-Mail.
 * @param plainPassword     User's Password (cleartext)
 * @returns                 User Login Command.
 */
export function UserLoginCall(userEmail: string, plainPassword: string): AccountCommand {
	// Construct Params Object.
	const paramsObject: any = new Object();
	paramsObject['userEmail'] = userEmail;
	paramsObject['plainPassword'] = plainPassword;

	const command = AccountCommand.builder()
		.withMethod(RequestMethod.POST)
		.withPath(AccountService.ACCOUNT_PATH + '/user/login')
		.withParams(paramsObject)
		.build();

	return command;
}
