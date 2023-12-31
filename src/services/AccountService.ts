// Allows for us to construct paramObjects.
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { RequestMethod } from '../enums/RequestMethod';
import { Command } from '../command/Command';

export class AccountService {
	static USER_PATH = '/v1/user';
	static ORGANIZATION_PATH = '/v1/organization';
}

/**
 * Command for creating an Organization on TimeMyCar.
 *
 * @param name      			Organization Name.
 * @param jwt                   JWT Auth Token.
 * @returns                     Organization Create Command.
 */
export function OrganizationCreateCall(name: string, jwt: string): Command {
	const paramsObject: any = new Object();
	paramsObject['name'] = name;

	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withJwt(jwt)
		.withPath(AccountService.ORGANIZATION_PATH + '/create')
		.withParams(paramsObject)
		.build();

	return command;
}

/**
 * Command for getting a list of Organizations on TimeMyCar.
 *
 * @param jwt               JWT Auth Token if you have it. Undefined if you don't want to use it.
 * @returns                 Organization List Command.
 */
export function OrganizationListCall(jwt?: string): Command {
	let command: Command;
	const path = AccountService.ORGANIZATION_PATH + '/list';

	if (jwt) {
		command = Command.builder().withMethod(RequestMethod.POST).withJwt(jwt).withPath(path).build();
	} else {
		command = Command.builder().withMethod(RequestMethod.POST).withPath(path).build();
	}

	return command;
}

/**
 * Command for getting a User's permission level in a TimeMyCar Organization.
 *
 * @param organizationId	Organization's ID.
 * @param jwt				JWT Auth Token.
 * @returns                 Organization List Command.
 */
export function OrganizationPermissionCall(organizationId: string, jwt: string): Command {
	const paramsObject: any = new Object();
	paramsObject['organizationId'] = organizationId;

	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withJwt(jwt)
		.withPath(AccountService.ORGANIZATION_PATH + '/permission')
		.withParams(paramsObject)
		.build();

	return command;
}

/**
 * Command for creating a TimeMyCar User.
 *
 *
 * @param email         	User E-Mail.
 * @param firstName         User's First Name.
 * @param lastName          User's Last Name.
 * @param address1          User's Address Line #1.
 * @param address2          User's Address Line #2.
 * @param city          	User's City.
 * @param state          	User's State.
 * @param country          	User's Country.
 * @param postalCode        User's Postal Code.
 * @param password     		User's Password (cleartext)
 * @returns                 User Creation Command.
 */
export function UserCreateCall(
	email: string,
	firstName: string,
	lastName: string,
	address1: string,
	address2: string,
	city: string,
	state: string,
	country: string,
	postalCode: string,
	password: string
): Command {
	// Construct Params Object.
	const paramsObject: any = new Object();
	paramsObject['email'] = email;
	paramsObject['firstName'] = firstName;
	paramsObject['lastName'] = lastName;
	paramsObject['address1'] = address1;
	paramsObject['address2'] = address2;
	paramsObject['city'] = city;
	paramsObject['state'] = state;
	paramsObject['country'] = country;
	paramsObject['postalCode'] = postalCode;
	paramsObject['password'] = password;

	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withPath(AccountService.USER_PATH + '/create')
		.withParams(paramsObject)
		.build();

	return command;
}

/**
 * Command for logging in as a TimeMyCar User.
 *
 * @param email         	User E-Mail.
 * @param password     		User's Password (cleartext)
 * @returns                 User Login Command.
 */
export function UserLoginCall(email: string, password: string): Command {
	// Construct Params Object.
	const paramsObject: any = new Object();
	paramsObject['email'] = email;
	paramsObject['password'] = password;

	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withPath(AccountService.USER_PATH + '/login')
		.withParams(paramsObject)
		.build();

	return command;
}

/**
 * Command for getting info about a TimeMyCar User
 * Only retrives your own info w/ your JWT.
 *
 * @param jwt         		JWT Auth Token.
 * @returns                 User Info Command.
 */
export function UserInfoCall(jwt: string): Command {
	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withJwt(jwt)
		.withPath(AccountService.USER_PATH + '/info')
		.build();

	return command;
}
