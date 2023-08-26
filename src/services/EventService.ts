import { RequestMethod } from '../enums/RequestMethod';
import { Command } from '../command/Command';
import { Racer } from '../model/Racer';
import IRacerQ from '../interfaces/IRacerQ';
import IEvent from '../interfaces/IEvent';

// TODO: These currently use the Interfaces because the classes aren't build
// Change ASAP.

export class EventService {
	static EVENT_PATH = '/api/v1/event';
}

/**
 * Command for adding a Racer to an Event.
 *
 * @param racer             Racer to add.
 * @param organizationId    Organization ID to add Racer to.
 * @param eventId           Event ID to add Racer to.
 * @param jwt               JWT Auth Token.
 * @returns                 Event Add Racer Command.
 */
export function EventAddRacerCall(
	racer: Racer,
	organizationId: string,
	eventId: string,
	jwt: string
): Command {
	const paramsObject: any = new Object();
	paramsObject['organizationId'] = organizationId;
	paramsObject['eventId'] = eventId;
	paramsObject['motorsportRegId'] = racer.motorsportRegId;
	paramsObject['firstName'] = racer.firstName;
	paramsObject['lastName'] = racer.lastName;
	paramsObject['carClass'] = racer.carClass;
	paramsObject['carNumber'] = racer.carNumber;
	paramsObject['carYear'] = racer.carYear;
	paramsObject['carMake'] = racer.carMake;
	paramsObject['carModel'] = racer.carModel;
	paramsObject['carColor'] = racer.carColor;

	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withJwt(jwt)
		.withPath(EventService.EVENT_PATH + '/racer/add')
		.withParams(paramsObject)
		.build();

	return command;
}

/**
 * Command for adding a RacerQ to an Event.
 *
 * @param racerId 			Racer's ID to add.
 * @param organizationId 	Organization ID to add RacerQ to.
 * @param eventId 			Event ID To add RacerQ to.
 * @param courseNumber 		Course Number to add RacerQ to.
 * @param jwt				JWT Auth Token.
 * @returns 				Event Add RacerQ Command.
 */
export function EventAddRacerQCall(
	racerId: string,
	organizationId: string,
	eventId: string,
	courseNumber: number,
	jwt: string
): Command {
	const paramsObject: any = new Object();
	paramsObject['organizationId'] = organizationId;
	paramsObject['eventId'] = eventId;
	paramsObject['racerId'] = racerId;
	paramsObject['courseNumber'] = courseNumber;

	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withJwt(jwt)
		.withPath(EventService.EVENT_PATH + '/racerq/add')
		.withParams(paramsObject)
		.build();

	return command;
}

export function EventCreateCall(
	organizationId: string,
	eventName: string,
	description: string,
	location: string,
	runCount: number,
	courseCount: number,
	jwt: string
) {
	const paramsObject: any = new Object();
	paramsObject['organizationId'] = organizationId;
	paramsObject['eventName'] = eventName;
	paramsObject['description'] = description;
	paramsObject['location'] = location;
	paramsObject['runCount'] = runCount;
	paramsObject['courseCount'] = courseCount;

	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withJwt(jwt)
		.withPath(EventService.EVENT_PATH + '/create')
		.withParams(paramsObject)
		.build();

	return command;
}

export function EventInfoCall(eventId: string, jwt: string): Command {
	const command = Command.builder()
		.withMethod(RequestMethod.GET)
		.withJwt(jwt)
		.withPath(EventService.EVENT_PATH + '/' + eventId + '/info')
		.build();

	return command;
}

export function EventInfoCallSpecific(
	eventId: string,
	organizationId: string,
	jwt: string
): Command {
	const command = Command.builder()
		.withMethod(RequestMethod.GET)
		.withJwt(jwt)
		.withPath(EventService.EVENT_PATH + '/' + eventId + '/organization/' + organizationId + '/info')
		.build();

	return command;
}

export function EventLapsAllCall(eventId: string, jwt: string): Command {
	const command = Command.builder()
		.withMethod(RequestMethod.GET)
		.withJwt(jwt)
		.withPath(EventService.EVENT_PATH + '/' + eventId + '/laps/all')
		.build();

	return command;
}

export function EventLapsNewCall(
	eventId: string,
	organizationId: string,
	creationTime: string,
	jwt: string
) {
	const command = Command.builder()
		.withMethod(RequestMethod.GET)
		.withJwt(jwt)
		.withPath(
			EventService.EVENT_PATH +
				'/' +
				eventId +
				'/organization/' +
				organizationId +
				'/laps/' +
				creationTime +
				'/new'
		)
		.build();

	return command;
}

export function EventLapsUpdatedCall(
	eventId: string,
	organizationId: string,
	lastUpdatedTime: string,
	jwt: string
) {
	const command = Command.builder()
		.withMethod(RequestMethod.GET)
		.withJwt(jwt)
		.withPath(
			EventService.EVENT_PATH +
				'/' +
				eventId +
				'/organization/' +
				organizationId +
				'/laps/' +
				lastUpdatedTime +
				'/updated'
		)
		.build();

	return command;
}

export function EventListCall(jwt?: string) {
	let command: Command;

	if (jwt) {
		command = Command.builder()
			.withMethod(RequestMethod.GET)
			.withJwt(jwt)
			.withPath(EventService.EVENT_PATH + '/event/list')
			.build();
	} else {
		command = Command.builder()
			.withMethod(RequestMethod.GET)
			.withPath(EventService.EVENT_PATH + '/event/list')
			.build();
	}

	return command;
}

export function EventRacerAllEventCall(eventId: string, organizationId: string, jwt: string) {
	const command = Command.builder()
		.withMethod(RequestMethod.GET)
		.withJwt(jwt)
		.withPath(
			EventService.EVENT_PATH + '/' + eventId + '/organization/' + organizationId + '/racer/all'
		)
		.build();

	return command;
}

export function EventRacerAllOrganizationCall(organizationId: string, jwt: string) {
	const command = Command.builder()
		.withMethod(RequestMethod.GET)
		.withJwt(jwt)
		.withPath(EventService.EVENT_PATH + '/organization/' + organizationId + '/racer/all')
		.build();

	return command;
}

export function EventRacerQAllCall(
	eventId: string,
	organizationId: string,
	courseNumber: number,
	jwt: string
) {
	const command = Command.builder()
		.withMethod(RequestMethod.GET)
		.withJwt(jwt)
		.withPath(
			EventService.EVENT_PATH +
				'/' +
				eventId +
				'/organization/' +
				organizationId +
				'/course/' +
				courseNumber +
				'/racerq/all'
		)
		.build();

	return command;
}

export function EventRemoveRacerQCall(
	racerId: string,
	organizationId: string,
	eventId: string,
	courseNumber: number,
	jwt: string
) {
	const paramsObject: any = new Object();
	paramsObject['racerId'] = racerId;
	paramsObject['organizationId'] = organizationId;
	paramsObject['eventId'] = eventId;
	paramsObject['courseNumber'] = courseNumber;

	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withJwt(jwt)
		.withPath(EventService.EVENT_PATH + '/racerq/remove')
		.withParams(paramsObject)
		.build();

	return command;
}

export function EventUpdateCall(event: IEvent, organizationId: string, jwt: string) {
	const paramsObject: any = new Object();
	paramsObject['event'] = event;
	paramsObject['organizationId'] = organizationId;

	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withJwt(jwt)
		.withPath(EventService.EVENT_PATH + '/update')
		.withParams(paramsObject)
		.build();

	return command;
}

export function EventUpdateRacerCall(
	racer: Racer,
	organizationId: string,
	eventId: string,
	jwt: string
) {
	const paramsObject: any = new Object();
	paramsObject['racer'] = racer;
	paramsObject['organizationId'] = organizationId;
	paramsObject['eventId'] = eventId;

	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withJwt(jwt)
		.withPath(EventService.EVENT_PATH + '/racer/update')
		.withParams(paramsObject)
		.build();

	return command;
}

export function EventUpdateRacerQCall(
	racerQ: IRacerQ,
	organizationId: string,
	eventId: string,
	jwt: string
) {
	const paramsObject: any = new Object();
	paramsObject['racerQ'] = racerQ;
	paramsObject['organizationId'] = organizationId;
	paramsObject['eventId'] = eventId;

	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withJwt(jwt)
		.withPath(EventService.EVENT_PATH + '/racerq/update')
		.withParams(paramsObject)
		.build();

	return command;
}
