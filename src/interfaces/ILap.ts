// Taken directly from Helium (08/26/23)

import type { LapFlag } from '../enums/LapFlag';
import type { LapStatus } from '../enums/LapStatus';

export interface ILap {
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
	creationTime: number;
	lastUpdatedTime: number;
	finalTime: number;
}

interface IPenalty {
	cones: number;
	gates: number;
}
