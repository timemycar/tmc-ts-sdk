import { AccountCommand } from '../../src/command/AccountCommand';
import { RequestMethod } from '../../src/enums/RequestMethod';
import {
	AccountService,
	OrganizationCreateCall,
	OrganizationListCall,
	UserCreateCall,
	UserLoginCall
} from '../../src/services/AccountService';

const accountPath = AccountService.ACCOUNT_PATH;
const defaultJwt = AccountCommand.DEFAULT_JWT;
const defaultParams = AccountCommand.DEFAULT_PARAMS;

const jwt = 'test-jwt';
const orgName = 'test-org';

const userEmail = 'abc@kiboigo.com';
const firstName = 'test';
const lastName = 'user';
const plainPassword = 'password';

test('OrganizationCreateCall Command', () => {
	const command = OrganizationCreateCall(orgName, jwt);

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(accountPath + '/organization/create');
	expect(command.params).toHaveProperty('name', orgName);
});

test('OrganizationListCall Command', () => {
	const command = OrganizationListCall();

	expect(command.method).toBe(RequestMethod.GET);
	expect(command.jwt).toBe(defaultJwt);
	expect(command.path).toBe(accountPath + '/organization/list');
	expect(command.params).toBe(defaultParams);
});

test('UserCreateCall Command', () => {
	const command = UserCreateCall(userEmail, firstName, lastName, plainPassword);

	// Command Checking
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(defaultJwt);
	expect(command.path).toBe(accountPath + '/user/create');

	// Params Checking
	expect(command.params).toHaveProperty('userEmail', userEmail);
	expect(command.params).toHaveProperty('firstName', firstName);
	expect(command.params).toHaveProperty('lastName', lastName);
	expect(command.params).toHaveProperty('plainPassword', plainPassword);
});

test('UserLoginCall Command', () => {
	const command = UserLoginCall(userEmail, plainPassword);

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(defaultJwt);
	expect(command.path).toBe(accountPath + '/user/login');

	// Params Checking
	expect(command.params).toHaveProperty('userEmail', userEmail);
	expect(command.params).toHaveProperty('plainPassword', plainPassword);
});
