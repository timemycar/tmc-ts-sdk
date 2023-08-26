// Taken directly from Helium (08/26/23)

import { EventStatus } from '../enums/EventStatus';
import { VisibilityStatus } from '../enums/VisibilityStatus';

export default interface IEvent {
	id: string;
	name: string;
	status: EventStatus;
	description: string;
	location: string;
	runCount: number;
	courseCount: number;
	organizationId: string;
	ruleset: Object;
	visibility: VisibilityStatus;
}
