import {
	Command,
	EventCreateCall,
	EventInfoCall,
	EventListCall,
	EventRacerAddCall,
	EventRacerAllEventCall,
	EventRacerAllOrganizationCall,
	EventRacerQAddCall,
	EventRacerQAllCall,
	EventRacerQRemoveCall,
	EventRacerQUpdateCall,
	EventRacerUpdateCall,
	EventService,
	EventUpdateCall,
	RequestMethod
} from '../../src';
import IEvent from '../../src/interfaces/IEvent';
import IRacerQ from '../../src/interfaces/IRacerQ';
import { Racer } from '../../src/model/Racer';

const jwt = 'test-jwt';

// Organization Constants.
const organizationId = 'orgId';

// Event Constants.
const eventId = 'eventId';
const eventName = 'eventName';
const eventDescription = 'eventDescription';
const eventLocation = 'eventLocation';
const eventRunCount = 1;
const eventCourseCount = 2;
const courseNumber = 1;

const event = {} as IEvent;

// Racer Constants.
const racerId = 'racerId';
const motorsportRegId = 'msrgid';
const firstName = 'test';
const lastName = 'user';
const carClass = 'carClass';
const carNumber = 'xyz';
const carYear = 1234;
const carMake = 'Toyota';
const carModel = 'Tundra';
const carColor = 'Silver';

const racer = new Racer(
	motorsportRegId,
	firstName,
	lastName,
	carClass,
	carNumber,
	carYear,
	carMake,
	carModel,
	carColor
);

const racerQ = {} as IRacerQ;

const eventPath = EventService.EVENT_PATH;
const defaultJwt = Command.DEFAULT_JWT;
const defaultParams = Command.DEFAULT_PARAMS;

test('EventCreateCall Command', () => {
	const command = EventCreateCall(
		organizationId,
		eventName,
		eventDescription,
		eventLocation,
		eventRunCount,
		eventCourseCount,
		jwt
	);

	expect(command.jwt).toBe(jwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/create');

	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventName', eventName);
	expect(command.params).toHaveProperty('description', eventDescription);
	expect(command.params).toHaveProperty('location', eventLocation);
	expect(command.params).toHaveProperty('runCount', eventRunCount);
	expect(command.params).toHaveProperty('courseCount', eventCourseCount);
});

test('EventInfoCall Command (no JWT, no Organization Id)', () => {
	const command = EventInfoCall(eventId);

	expect(command.jwt).toBe(defaultJwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/info');

	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).not.toHaveProperty('organizationId');
});

test('EventInfoCall Command (no JWT, Organization Id)', () => {
	const command = EventInfoCall(eventId, organizationId);

	expect(command.jwt).toBe(defaultJwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/info');

	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).toHaveProperty('organizationId', organizationId);
});

test('EventInfoCall Command (JWT, no Organization Id)', () => {
	const command = EventInfoCall(eventId, undefined, jwt);

	expect(command.jwt).toBe(jwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/info');

	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).not.toHaveProperty('organizationId');
});

test('EventInfoCall Command (JWT, Organization Id)', () => {
	const command = EventInfoCall(eventId, organizationId, jwt);

	expect(command.jwt).toBe(jwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/info');

	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).toHaveProperty('organizationId', organizationId);
});

test('EventListCall Command (no JWT)', () => {
	const command = EventListCall();

	expect(command.jwt).toBe(defaultJwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/list');
	expect(command.params).toBe(defaultParams);
});

test('EventListCall Command (JWT)', () => {
	const command = EventListCall(jwt);

	expect(command.jwt).toBe(jwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/list');
	expect(command.params).toBe(defaultParams);
});

test('EventRacerAddCall Command', () => {
	const command = EventRacerAddCall(racer, organizationId, eventId, jwt);

	expect(command.jwt).toBe(jwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/racer/add');

	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).toHaveProperty('motorsportRegId', racer.motorsportRegId);
	expect(command.params).toHaveProperty('firstName', racer.firstName);
	expect(command.params).toHaveProperty('lastName', racer.lastName);
	expect(command.params).toHaveProperty('carClass', racer.carClass);
	expect(command.params).toHaveProperty('carNumber', racer.carNumber);
	expect(command.params).toHaveProperty('carYear', racer.carYear);
	expect(command.params).toHaveProperty('carMake', racer.carMake);
	expect(command.params).toHaveProperty('carModel', racer.carModel);
	expect(command.params).toHaveProperty('carColor', racer.carColor);
});

test('EventRacerAllEventCall Command', () => {
	const command = EventRacerAllEventCall(organizationId, eventId);

	expect(command.jwt).toBe(defaultJwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/racer/all');

	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
});

test('EventRacerAllOrganizationCall Command', () => {
	const command = EventRacerAllOrganizationCall(organizationId, jwt);

	expect(command.jwt).toBe(jwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/racer/organization/all');

	expect(command.params).toHaveProperty('organizationId', organizationId);
});

test('EventRacerQAddCall Command', () => {
	const command = EventRacerQAddCall(racerId, organizationId, eventId, courseNumber, jwt);

	expect(command.jwt).toBe(jwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/racerq/add');

	expect(command.params).toHaveProperty('racerId', racerId);
	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).toHaveProperty('courseNumber', courseNumber);
});

test('EventRacerQAllCall Command', () => {
	const command = EventRacerQAllCall(organizationId, eventId, courseNumber, jwt);

	expect(command.jwt).toBe(jwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/racerq/all');

	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).toHaveProperty('courseNumber', courseNumber);
});

test('EventRacerQRemoveCall Command', () => {
	const command = EventRacerQRemoveCall(racerId, organizationId, eventId, courseNumber, jwt);

	expect(command.jwt).toBe(jwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/racerq/remove');

	expect(command.params).toHaveProperty('racerId', racerId);
	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
	expect(command.params).toHaveProperty('courseNumber', courseNumber);
});

test('EventRacerQUpdateCall Command', () => {
	const command = EventRacerQUpdateCall(racerQ, organizationId, eventId, jwt);

	expect(command.jwt).toBe(jwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/racerq/update');

	expect(command.params).toHaveProperty('racerQ', racerQ);
	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
});

test('EventRacerUpdateCall Command', () => {
	const command = EventRacerUpdateCall(racer, organizationId, eventId, jwt);

	expect(command.jwt).toBe(jwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/racer/update');

	expect(command.params).toHaveProperty('racer', racer);
	expect(command.params).toHaveProperty('organizationId', organizationId);
	expect(command.params).toHaveProperty('eventId', eventId);
});

test('EventUpdateCall Command', () => {
	const command = EventUpdateCall(event, organizationId, jwt);

	expect(command.jwt).toBe(jwt);
	expect(command.method).toBe(RequestMethod.POST);
	expect(command.path).toBe(eventPath + '/update');

	expect(command.params).toHaveProperty('event', event);
	expect(command.params).toHaveProperty('organizationId', organizationId);
});
