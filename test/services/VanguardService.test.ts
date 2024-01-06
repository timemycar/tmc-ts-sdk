import {
	Command,
	IEvent,
	ILap,
	IOrganization,
	IRacer,
	RequestMethod,
	VanguardCheckCall,
	VanguardPullCall,
	VanguardPushCall,
	VanguardService,
	VanguardWipeCall
} from '../../src';

// JWT Constant
const jwt = 'test-jwt';

const event: IEvent = {} as IEvent;
const laps: ILap[] = [];
const racers: IRacer[] = [];
const organization: IOrganization = {} as IOrganization;

// Organization Constants
const organizationId = 'orgId';

const vanguardPath = VanguardService.VANGUARD_PATH;
const defaultJwt = Command.DEFAULT_JWT;

test('VanguardWipeCall Command', () => {
	const command = VanguardWipeCall();

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(defaultJwt);
	expect(command.path).toBe(vanguardPath + '/wipe');
});

test('VanguardCheckCall Command', () => {
	const command = VanguardCheckCall();

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(defaultJwt);
	expect(command.path).toBe(vanguardPath + '/check');
});

test('VanguardPullCall Command', () => {
	const command = VanguardPullCall(laps, racers, event, organization);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(defaultJwt);
	expect(command.path).toBe(vanguardPath + '/pull');
	expect(command.params).toHaveProperty('laps', JSON.stringify(laps));
	expect(command.params).toHaveProperty('racers', JSON.stringify(racers));
	expect(command.params).toHaveProperty('event', JSON.stringify(event));
	expect(command.params).toHaveProperty('organization', JSON.stringify(organization));
});

test('VanguardPushCall Command', () => {
	const command = VanguardPushCall(laps, racers, event, organizationId, jwt);

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(vanguardPath + '/push');
	expect(command.params).toHaveProperty('laps', JSON.stringify(laps));
	expect(command.params).toHaveProperty('racers', JSON.stringify(racers));
	expect(command.params).toHaveProperty('event', JSON.stringify(event));
	expect(command.params).toHaveProperty('organizationId', organizationId);
});
