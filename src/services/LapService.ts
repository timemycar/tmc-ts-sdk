// Allows for us to construct paramObjects.
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Command } from '../command/Command';
import { RequestMethod } from '../enums/RequestMethod';
import ILap from '../interfaces/ILap';

export class LapService {
	static LAP_PATH = '/v1/lap';
	static LAPS_PATH = '/v1/laps';
}

/**
 * Command for getting all the Laps from a TimeMyCar Event.
 *
 * @param eventId 			Event Id.
 * @param jwt 				JWT Auth Token, set to undefined if you only want public laps.
 * @returns 				Laps All Command.
 */
export function LapsAllCall(eventId: string, jwt?: string): Command {
	const paramsObject: any = new Object();
	paramsObject['eventId'] = eventId;

	let command: Command;
	if (jwt) {
		command = Command.builder()
			.withJwt(jwt)
			.withMethod(RequestMethod.POST)
			.withPath(LapService.LAPS_PATH + '/all')
			.withParams(paramsObject)
			.build();
	} else {
		command = Command.builder()
			.withMethod(RequestMethod.POST)
			.withPath(LapService.LAPS_PATH + '/all')
			.withParams(paramsObject)
			.build();
	}

	return command;
}

/**
 * Command for getting all the new Laps from a TimeMyCar Event.
 *
 * @param organizationId 	Organization Id.
 * @param eventId 			Event Id.
 * @param creationTime		Time for the Laps to be newer than.
 * @param jwt 				JWT Auth Token.
 * @returns 				Laps New Command.
 */
export function LapsNewCall(
	organizationId: string,
	eventId: string,
	creationTime: number,
	jwt: string
): Command {
	// Ensure creationTime is an integer.
	if (!Number.isInteger(creationTime)) {
		console.warn(
			`creationTime: ${creationTime} is not an integer and will be rounded to: ${Math.floor(
				creationTime
			)}`
		);
		creationTime = Math.floor(creationTime);
	}

	const paramsObject: any = new Object();
	paramsObject['organizationId'] = organizationId;
	paramsObject['eventId'] = eventId;
	paramsObject['creationTime'] = creationTime;

	const command = Command.builder()
		.withJwt(jwt)
		.withMethod(RequestMethod.POST)
		.withPath(LapService.LAPS_PATH + '/new')
		.withParams(paramsObject)
		.build();

	return command;
}

/**
 * Command to start a Lap in a TimeMyCar Event.
 *
 * @param organizationId 	Organization Id.
 * @param eventId 			Event Id.
 * @param courseNumber 		Course Number.
 * @param startTime 		Start Time of the Lap.
 * @param jwt 				JWT Auth Token.
 * @returns 				Lap Start Command.
 */
export function LapStartCall(
	organizationId: string,
	eventId: string,
	courseNumber: number,
	startTime: number,
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

	// Ensure creationTime is an floating point value.
	if (Number.isInteger(startTime)) {
		console.warn(
			`startTime: ${startTime} is not a float and will be turned to: ${startTime.toFixed(1)}`
		);
		startTime = Number.parseFloat(startTime.toFixed(1));
	}

	const paramsObject: any = new Object();
	paramsObject['organizationId'] = organizationId;
	paramsObject['eventId'] = eventId;
	paramsObject['courseNumber'] = courseNumber;
	paramsObject['startTime'] = startTime;

	const command = Command.builder()
		.withJwt(jwt)
		.withMethod(RequestMethod.POST)
		.withPath(LapService.LAP_PATH + '/start')
		.withParams(paramsObject)
		.build();

	return command;
}

/**
 * Command to stop a Lap in a TimeMyCar Event.
 *
 * @param organizationId 	Organization Id.
 * @param eventId 			Event Id.
 * @param courseNumber 		Course Number.
 * @param stopTime 			Stop Time of the Lap.
 * @param jwt 				JWT Auth Token.
 * @returns 				Lap Stop Command.
 */
export function LapStopCall(
	organizationId: string,
	eventId: string,
	courseNumber: number,
	stopTime: number,
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

	// Ensure creationTime is an floating point value.
	if (Number.isInteger(stopTime)) {
		console.warn(
			`stopTime: ${stopTime} is not a float and will be turned to: ${stopTime.toFixed(1)}`
		);
		stopTime = Number.parseFloat(stopTime.toFixed(1));
	}

	const paramsObject: any = new Object();
	paramsObject['organizationId'] = organizationId;
	paramsObject['eventId'] = eventId;
	paramsObject['courseNumber'] = courseNumber;
	paramsObject['stopTime'] = stopTime;

	const command = Command.builder()
		.withJwt(jwt)
		.withMethod(RequestMethod.POST)
		.withPath(LapService.LAP_PATH + '/stop')
		.withParams(paramsObject)
		.build();

	return command;
}

/**
 * Command to get all the updated Laps in a TimeMyCar Event.
 *
 * @param organizationId 	Organization Id.
 * @param eventId 			Event Id.
 * @param lastUpdatedTime 	Time for Laps to have been updated after.
 * @param jwt 				JWT Auth Token.
 * @returns 				Lap Updated Command.
 */
export function LapsUpdatedCall(
	organizationId: string,
	eventId: string,
	lastUpdatedTime: number,
	jwt: string
): Command {
	// Ensure lastUpdatedTime is an integer.
	if (!Number.isInteger(lastUpdatedTime)) {
		console.warn(
			`lastUpdatedTime: ${lastUpdatedTime} is not an integer and will be rounded to: ${Math.floor(
				lastUpdatedTime
			)}`
		);
		lastUpdatedTime = Math.floor(lastUpdatedTime);
	}

	const paramsObject: any = new Object();
	paramsObject['organizationId'] = organizationId;
	paramsObject['eventId'] = eventId;
	paramsObject['lastUpdatedTime'] = lastUpdatedTime;

	const command = Command.builder()
		.withJwt(jwt)
		.withMethod(RequestMethod.POST)
		.withPath(LapService.LAPS_PATH + '/updated')
		.withParams(paramsObject)
		.build();

	return command;
}

/**
 * Command to update a Lap in a TimeMyCar Event.
 *
 * @param lap 				Lap Object.
 * @param organizationId 	Organization Id.
 * @param eventId 			Event Id.
 * @param jwt 				JWT Auth Token.
 * @returns 				Lap Update Command.
 */
export function LapUpdateCall(
	lap: ILap,
	organizationId: string,
	eventId: string,
	jwt: string
): Command {
	const paramsObject: any = new Object();
	paramsObject['lap'] = lap;
	paramsObject['organizationId'] = organizationId;
	paramsObject['eventId'] = eventId;

	const command = Command.builder()
		.withJwt(jwt)
		.withMethod(RequestMethod.POST)
		.withPath(LapService.LAP_PATH + '/update')
		.withParams(paramsObject)
		.build();

	return command;
}
