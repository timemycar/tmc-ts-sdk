// Taken directly from Helium (08/26/23)

import type { LapFlag } from '../enums/LapFlag';
import type { LapStatus } from '../enums/LapStatus';
import { ITemporal } from './extend/ITemporal';

export interface ILap extends ITemporal {
	id: string;
	status: LapStatus;
	racerId: string;
	carClass: string;
	penalties: IPenalty;
	lapFlags: Array<LapFlag>;
	runNumber: number;
	courseNumber: number;
	startTime: number;
	stopTime: number;
	rawTime: number;
	finalTime: number;
}

interface IPenalty {
	cones: number;
	gates: number;
}
