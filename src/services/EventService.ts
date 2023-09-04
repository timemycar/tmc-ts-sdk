// Allows for us to construct paramObjects.
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Command } from '../command/Command';
import { RequestMethod } from '../enums/RequestMethod';
import { IEvent } from '../interfaces/IEvent';
import { IRacerQ } from '../interfaces/IRacerQ';
import { Racer } from '../model/Racer';

// TODO: These currently use the Interfaces because the classes aren't build
// Change ASAP.

export class EventService {
	static EVENT_PATH = '/v1/event';
}

/**
 * Command for create a TimeMyCar Event.
 *
 * @param organizationId 	Organization ID to add Event to.
 * @param eventName 		Event Name.
 * @param description 		Event Description.
 * @param location 			Event Location.
 * @param runCount 			Event Run Count.
 * @param courseCount 		Event Course Count.
 * @param jwt 				JWT Auth Token.
 * @returns 				Event Create Command.
 */
export function EventCreateCall(
	organizationId: string,
	eventName: string,
	description: string,
	location: string,
	runCount: number,
	courseCount: number,
	jwt: string
): Command {
	const paramsObject: any = new Object();
	paramsObject['organizationId'] = organizationId;
	paramsObject['name'] = eventName;
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

/**
 * Command for getting the information of a TimeMyCar Event.
 *
 * @param eventId 			Event ID.
 * @param organizationId 	Organization ID if you have it. Set to undefined if you don't have this.
 * @param jwt 				JWT Auth Token. Set to undefined if you don't have or only want to search public Events.
 * @returns 				Event Info Command.
 */
export function EventInfoCall(eventId: string, organizationId?: string, jwt?: string): Command {
	const paramsObject: any = new Object();
	paramsObject['eventId'] = eventId;

	if (organizationId) {
		paramsObject['organizationId'] = organizationId;
	}

	const path = EventService.EVENT_PATH + '/info';

	let command: Command;

	// Generate command based on JWT.
	if (jwt) {
		command = Command.builder()
			.withMethod(RequestMethod.POST)
			.withJwt(jwt)
			.withPath(path)
			.withParams(paramsObject)
			.build();
	} else {
		command = Command.builder()
			.withMethod(RequestMethod.POST)
			.withPath(path)
			.withParams(paramsObject)
			.build();
	}

	return command;
}

/**
 * Command to list all TimeMyCar Events.
 *
 * @param jwt 				JWT Auth Token. Set to undefined if you don't have or only want to search public Events.
 * @returns 				Event List Command.
 */
export function EventListCall(jwt?: string): Command {
	let command: Command;

	if (jwt) {
		command = Command.builder()
			.withMethod(RequestMethod.POST)
			.withJwt(jwt)
			.withPath(EventService.EVENT_PATH + '/list')
			.build();
	} else {
		command = Command.builder()
			.withMethod(RequestMethod.POST)
			.withPath(EventService.EVENT_PATH + '/list')
			.build();
	}

	return command;
}

/**
 * Command for adding a Racer to a TimeMyCar Event.
 *
 * @param racer             Racer to add.
 * @param organizationId    Organization ID to add Racer to.
 * @param eventId           Event ID to add Racer to.
 * @param jwt               JWT Auth Token.
 * @returns                 Event Racer Add Command.
 */
export function EventRacerAddCall(
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
 * Command to list all of the Racers in a TimeMyCar Event.
 *
 * @param organizationId 	Organization ID.
 * @param eventId 			Event ID.
 * @returns 				Event Racer All Event Command.
 */
export function EventRacerAllEventCall(organizationId: string, eventId: string): Command {
	const paramsObject: any = new Object();
	paramsObject['organizationId'] = organizationId;
	paramsObject['eventId'] = eventId;

	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withPath(EventService.EVENT_PATH + '/racer/all')
		.withParams(paramsObject)
		.build();

	return command;
}

/**
 * Command to list all of the Racers in a TimeMyCar Organization.
 *
 * @param organizationId 	Organization ID.
 * @param jwt 				JWT Auth Token.
 * @returns 				Event Racer All Organization Command.
 */
export function EventRacerAllOrganizationCall(organizationId: string, jwt: string): Command {
	const paramsObject: any = new Object();
	paramsObject['organizationId'] = organizationId;

	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withJwt(jwt)
		.withPath(EventService.EVENT_PATH + '/racer/organization/all')
		.withParams(paramsObject)
		.build();

	return command;
}

/**
 * Command for adding a RacerQ to a TimeMyCar Event.
 *
 * @param racerId 			Racer's ID to add.
 * @param organizationId 	Organization ID to add RacerQ to.
 * @param eventId 			Event ID To add RacerQ to.
 * @param courseNumber 		Course Number to add RacerQ to.
 * @param jwt				JWT Auth Token.
 * @returns 				Event RacerQ Add Command.
 */
export function EventRacerQAddCall(
	racerId: string,
	organizationId: string,
	eventId: string,
	courseNumber: number,
	jwt: string
): Command {
	// Ensure courseNumber is an integer.
	if (!Number.isInteger(courseNumber)) {
		console.warn(
			`courseNumber: ${courseNumber} is not an integer and will be rounded to: ${Math.floor(
				courseNumber
			)}`
		);
		courseNumber = Math.floor(courseNumber);
	}

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

/**
 * Command to list all of the RacerQ Entries in a TimeMyCar Event by Course
 *
 * @param organizationId 	Organization ID.
 * @param eventId 			Event ID.
 * @param courseNumber 		Course Number.
 * @param jwt 				JWT Auth Token.
 * @returns 				Event RacerQ All Command.
 */
export function EventRacerQAllCall(
	organizationId: string,
	eventId: string,
	courseNumber: number,
	jwt: string
): Command {
	// Ensure courseNumber is an integer.
	if (!Number.isInteger(courseNumber)) {
		console.warn(
			`courseNumber: ${courseNumber} is not an integer and will be rounded to: ${Math.floor(
				courseNumber
			)}`
		);
		courseNumber = Math.floor(courseNumber);
	}

	const paramsObject: any = new Object();
	paramsObject['organizationId'] = organizationId;
	paramsObject['eventId'] = eventId;
	paramsObject['courseNumber'] = courseNumber;

	const command = Command.builder()
		.withMethod(RequestMethod.POST)
		.withJwt(jwt)
		.withPath(EventService.EVENT_PATH + '/racerq/all')
		.withParams(paramsObject)
		.build();

	return command;
}

/**
 * Command to remove a RacerQ Entry from a TimeMyCar Event.
 *
 * @param racerId 			Racer Id for RacerQ Entry.
 * @param organizationId 	Organization Id.
 * @param eventId 			Event Id.
 * @param courseNumber 		Course Number.
 * @param jwt 				JWT Auth Token.
 * @returns 				Event RacerQ RemoveCommand.
 */
export function EventRacerQRemoveCall(
	racerId: string,
	organizationId: string,
	eventId: string,
	courseNumber: number,
	jwt: string
): Command {
	// Ensure courseNumber is an integer.
	if (!Number.isInteger(courseNumber)) {
		console.warn(
			`courseNumber: ${courseNumber} is not an integer and will be rounded to: ${Math.floor(
				courseNumber
			)}`
		);
		courseNumber = Math.floor(courseNumber);
	}

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

/**
 * Command to update a RacerQ Entry in a TimeMyCar Event.
 *
 * @param racerQ 			RacerQ Object.
 * @param organizationId 	Organization Id.
 * @param eventId 			Event Id.
 * @param jwt 				JWT Auth Token.
 * @returns 				Event RacerQ Update Command.
 */
export function EventRacerQUpdateCall(
	racerQ: IRacerQ,
	organizationId: string,
	eventId: string,
	jwt: string
): Command {
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

/**
 * Command to update a Racer in a TimeMyCar Event.
 *
 * @param racer 			Racer Object.
 * @param organizationId 	Organization Id.
 * @param eventId 			Event Id.
 * @param jwt 				JWT Auth Token.
 * @returns 				Event Racer Update Command.
 */
export function EventRacerUpdateCall(
	racer: Racer,
	organizationId: string,
	eventId: string,
	jwt: string
): Command {
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

/**
 * Command to update a TimeMyCar Event.
 *
 * @param event 			Event Object.
 * @param organizationId 	Organization Id.
 * @param jwt 				JWT Auth Token.
 * @returns 				Event Update Command.
 */
export function EventUpdateCall(event: IEvent, organizationId: string, jwt: string): Command {
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
