import {
	Command,
	OrganizationCreateCall,
	OrganizationListCall,
	RequestMethod,
	UserCreateCall,
	UserLoginCall
} from '../../src';
import {
	AccountService,
	OrganizationPermissionCall,
	UserInfoCall
} from '../../src/services/AccountService';

const userPath = AccountService.USER_PATH;
const organizationPath = AccountService.ORGANIZATION_PATH;
const defaultJwt = Command.DEFAULT_JWT;
const defaultParams = Command.DEFAULT_PARAMS;

const jwt = 'test-jwt';
const orgName = 'test-org';
const orgId = 'test-org-id';

const email = 'abc@kiboigo.com';
const firstName = 'test';
const lastName = 'user';
const address1 = 'address1';
const address2 = 'address2';
const city = 'city';
const state = 'state';
const country = 'country';
const postalCode = 'postalCode';
const password = 'password';

test('OrganizationCreateCall Command', async () => {
	const command = OrganizationCreateCall(orgName, jwt);

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(organizationPath + '/create');
	expect(command.params).toHaveProperty('name', orgName);
});

test('OrganizationListCall Command', () => {
	const command = OrganizationListCall();

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(defaultJwt);
	expect(command.path).toBe(organizationPath + '/list');
	expect(command.params).toBe(defaultParams);
});

test('OrganizationPermissionCall Command', () => {
	const command = OrganizationPermissionCall(orgId, jwt);

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(organizationPath + '/permission');

	// Params Checking
	expect(command.params).toHaveProperty('organizationId', orgId);
});

test('UserCreateCall Command', () => {
	const command = UserCreateCall(
		email,
		firstName,
		lastName,
		address1,
		address2,
		city,
		state,
		country,
		postalCode,
		password
	);

	// Command Checking
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(defaultJwt);
	expect(command.path).toBe(userPath + '/create');

	// Params Checking
	expect(command.params).toHaveProperty('email', email);
	expect(command.params).toHaveProperty('firstName', firstName);
	expect(command.params).toHaveProperty('lastName', lastName);
	expect(command.params).toHaveProperty('address1', address1);
	expect(command.params).toHaveProperty('address2', address2);
	expect(command.params).toHaveProperty('city', city);
	expect(command.params).toHaveProperty('state', state);
	expect(command.params).toHaveProperty('country', country);
	expect(command.params).toHaveProperty('postalCode', postalCode);
	expect(command.params).toHaveProperty('password', password);
});

test('UserLoginCall Command', () => {
	const command = UserLoginCall(email, password);

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(defaultJwt);
	expect(command.path).toBe(userPath + '/login');

	// Params Checking
	expect(command.params).toHaveProperty('email', email);
	expect(command.params).toHaveProperty('password', password);
});

test('UserInfoCall Command', () => {
	const command = UserInfoCall(jwt);

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(userPath + '/info');

	// Params Checking
	expect(command.params).toBe(defaultParams);
});
