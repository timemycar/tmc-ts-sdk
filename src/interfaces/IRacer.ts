// Taken directly from Helium (08/26/23)

import { ITemporal } from './extend/ITemporal';

export interface IRacer extends ITemporal {
	id?: string;
	motorsportRegId: string;
	firstName: string;
	lastName: string;
	carClass: string;
	carNumber: string;
	carYear: number;
	carMake: string;
	carModel: string;
	carColor: string;
}
