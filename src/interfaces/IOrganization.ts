// Taken directly from Helium (08/26/23)

import type { VisibilityStatus } from '../enums/VisibilityStatus';
import { ITemporal } from './extend/ITemporal';

export interface IOrganization extends ITemporal {
	id: string;
	name: string;
	owner: string;
	officers: string[];
	visibility: VisibilityStatus;
	api: string;
}
