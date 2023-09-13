// Taken directly from Helium (08/26/23)

import type { VisibilityStatus } from '../enums/VisibilityStatus';

export interface IOrganization {
	id: string;
	name: string;
	owner: string;
	visibility: VisibilityStatus;
	api: string;
}
