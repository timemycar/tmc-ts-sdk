// Allows for us to construct paramObjects.
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Command } from '../command/Command';
import { IEvent } from '../interfaces/IEvent';
import { ILap } from '../interfaces/ILap';
import { IOrganization } from '../interfaces/IOrganization';
import { IRacer } from '../interfaces/IRacer';

export class VanguardService {
	static VANGUARD_PATH = '/v1/vanguard';
}

/**
 * Command for wiping the database on a Vanguard instance.
 * Should be ran with a TimeMyCar Client pointing at a Vanguard Instance.
 *
 * @returns Vanguard Wipe Command.
 */
export function VanguardWipeCall(): Command {
	const command = Command.builder()
		.withPath(VanguardService.VANGUARD_PATH + '/wipe')
		.build();

	return command;
}

/**
 * Command for checking the Vanguard database and returning the current Event.
 * Should be ran with a TimeMyCar Client pointing at a Vanguard Instance.
 *
 * @returns Vanguard Check Command.
 */
export function VanguardCheckCall(): Command {
	const command = Command.builder()
		.withPath(VanguardService.VANGUARD_PATH + '/check')
		.build();

	return command;
}

/*
 * Command for pulling data into Vanguard from an Upstream instance into Vanguard.
 * Should be ran with a TimeMyCar Client pointing at a Vanguard Instance.
 *
 * @param laps              List of initial Laps pulled from Upstream.
 * @param racers            List of initial Racers pulled from Upstream.
 * @param event             Event pulled from Upstream.
 * @param organization      Organization pulled from Upstream.
 *
 * @returns                 Vanguard Pull Command.
 */
export function VanguardPullCall(
	laps: ILap[],
	racers: IRacer[],
	event: IEvent,
	organization: IOrganization
): Command {
	const paramsObject: any = new Object();
	paramsObject['laps'] = JSON.stringify(laps);
	paramsObject['racers'] = JSON.stringify(racers);
	paramsObject['event'] = JSON.stringify(event);
	paramsObject['organization'] = JSON.stringify(organization);

	const command = Command.builder()
		.withPath(VanguardService.VANGUARD_PATH + '/pull')
		.withParams(paramsObject)
		.build();

	return command;
}

/*
 * Command for pushing updates to Laps, Racers and the Event from a Vanguard instance into an Upstream instance.
 * Should be ran with a TimeMyCar Client pointing at an Upstream Instance.
 *
 * @param laps              List of all of the updated Laps.
 * @param racers            List of all of the updated Racers.
 * @param event             Updated Event
 * @param organizationId    Organization Id
 * @param jwt               JWT Auth Token
 *
 * @returns                 Vanguard Push Command.
 */
export function VanguardPushCall(
	laps: ILap[],
	racers: IRacer[],
	event: IEvent,
	organizationId: string,
	jwt: string
): Command {
	const paramsObject: any = new Object();
	paramsObject['laps'] = JSON.stringify(laps);
	paramsObject['racers'] = JSON.stringify(racers);
	paramsObject['event'] = JSON.stringify(event);
	paramsObject['organizationId'] = organizationId;

	const command = Command.builder()
		.withJwt(jwt)
		.withPath(VanguardService.VANGUARD_PATH + '/push')
		.withParams(paramsObject)
		.build();

	return command;
}
