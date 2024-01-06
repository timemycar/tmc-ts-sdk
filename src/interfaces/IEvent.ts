// Taken directly from Helium (08/26/23)

import { EventStatus } from '../enums/EventStatus';
import { VisibilityStatus } from '../enums/VisibilityStatus';
import { ITemporal } from './extend/ITemporal';

export interface IEvent extends ITemporal {
	id: string;
	name: string;
	status: EventStatus;
	description: string;
	location: string;
	runCount: number;
	courseCount: number;
	organizationId: string;
	ruleset: object;
	visibility: VisibilityStatus;
}
