import { Command, RequestMethod } from '../../src';
import ILap from '../../src/interfaces/ILap';
import {
	LapService,
	LapStartCall,
	LapStopCall,
	LapUpdateCall,
	LapsAllCall,
	LapsNewCall,
	LapsUpdatedCall
} from '../../src/services/LapService';

let consoleWarnMock: jest.SpyInstance;

const jwt = 'test-jwt';

// Event Constant
const eventId = 'eventId';

// Organization Constants
const organizationId = 'orgId';

const creationTime = 10;
const creationTimeFloat = 10.212;

const courseNumber = 1;
const courseNumberFloat = 1.232;

const startTime = 39.0;
const startTimeInteger = 39;

const stopTime = 42.0;
const stopTimeInteger = 42;

const lastUpdatedTime = 52;
const lastUpdatedTimeFloat = 52.421;

const lap = {} as ILap;

const lapPath = LapService.LAP_PATH;
const lapsPath = LapService.LAPS_PATH;

const defaultJwt = Command.DEFAULT_JWT;

beforeEach(() => {
	consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
});

afterEach(() => {
	consoleWarnMock.mockRestore();
});

test('LapsAllCall Command (no JWT)', () => {
	const command = LapsAllCall(eventId);

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(defaultJwt);
	expect(command.path).toBe(lapsPath + '/all');
	expect(command.params).toHaveProperty('eventId', eventId);
});

test('LapsAllCall Command (JWT)', () => {
	const command = LapsAllCall(eventId, jwt);

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(lapsPath + '/all');
	expect(command.params).toHaveProperty('eventId', eventId);
});

test('LapsNewCall Command (Correct)', () => {
	const command = LapsNewCall(organizationId, eventId, creationTime, jwt);

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(lapsPath + '/new');
	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).toHaveProperty('creationTime', creationTime);
});

test('LapsNewCall Command (Incorrect)', () => {
	const command = LapsNewCall(organizationId, eventId, creationTimeFloat, jwt);

	// For converting the float to an int.
	expect(console.warn).toBeCalledTimes(1);
	expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('not an integer'));

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(lapsPath + '/new');
	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).toHaveProperty('creationTime', creationTime);
});

test('LapStartCall Command (Correct)', () => {
	const command = LapStartCall(organizationId, eventId, courseNumber, startTime, jwt);

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(lapPath + '/start');
	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).toHaveProperty('courseNumber', courseNumber);
	expect(command.params).toHaveProperty('startTime', startTime);
});

test('LapStartCall Command (Incorrect)', () => {
	const command = LapStartCall(organizationId, eventId, courseNumberFloat, startTimeInteger, jwt);

	// Typechecking courseNumber & startTime.
	expect(console.warn).toBeCalledTimes(2);
	expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('not an integer'));
	expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('not a float'));

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(lapPath + '/start');
	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).toHaveProperty('courseNumber', courseNumber);
	expect(command.params).toHaveProperty('startTime', startTime);
});

test('LapStopCall Command (Correct)', () => {
	const command = LapStopCall(organizationId, eventId, courseNumber, stopTime, jwt);

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(lapPath + '/stop');
	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).toHaveProperty('courseNumber', courseNumber);
	expect(command.params).toHaveProperty('stopTime', stopTime);
});

test('LapStopCall Command (Incorrect)', () => {
	const command = LapStopCall(organizationId, eventId, courseNumberFloat, stopTimeInteger, jwt);

	// Typechecking courseNumber & startTime.
	expect(console.warn).toBeCalledTimes(2);
	expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('not an integer'));
	expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('not a float'));

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(lapPath + '/stop');
	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).toHaveProperty('courseNumber', courseNumber);
	expect(command.params).toHaveProperty('stopTime', stopTime);
});

test('LapsUpdatedCall Command (Correct)', () => {
	const command = LapsUpdatedCall(organizationId, eventId, lastUpdatedTime, jwt);

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(lapsPath + '/updated');
	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).toHaveProperty('lastUpdatedTime', lastUpdatedTime);
});

test('LapsUpdatedCall Command (Incorrect)', () => {
	const command = LapsUpdatedCall(organizationId, eventId, lastUpdatedTimeFloat, jwt);

	// For converting the float to an int.
	expect(console.warn).toBeCalledTimes(1);
	expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('not an integer'));

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(lapsPath + '/updated');
	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).toHaveProperty('lastUpdatedTime', lastUpdatedTime);
});

test('LapUpdateCall Command', () => {
	const command = LapUpdateCall(lap, organizationId, eventId, jwt);

	expect(command.method).toBe(RequestMethod.POST);
	expect(command.jwt).toBe(jwt);
	expect(command.path).toBe(lapPath + '/update');
	expect(command.params).toHaveProperty('lap', lap);
	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
});
