// Taken directly from Helium (08/26/23)

import type { VisibilityStatus } from '../enums/VisibilityStatus';

export default interface IOrganization {
	id: string;
	name: string;
	ownerId: string;
	visibility: VisibilityStatus;
	api: string;
}
