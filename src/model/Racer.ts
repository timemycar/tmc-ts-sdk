import { IRacer } from '../interfaces/IRacer';

export class Racer implements IRacer {
	id?: string | undefined;
	motorsportRegId: string;
	firstName: string;
	lastName: string;
	carClass: string;
	carNumber: string;
	carYear: number;
	carMake: string;
	carModel: string;
	carColor: string;

	constructor(
		motorsportRegId: string,
		firstName: string,
		lastName: string,
		carClass: string,
		carNumber: string,
		carYear: number,
		carMake: string,
		carModel: string,
		carColor: string,
		id?: string
	) {
		this.id = id;
		this.motorsportRegId = motorsportRegId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.carClass = carClass;
		this.carNumber = carNumber;
		this.carYear = carYear;
		this.carMake = carMake;
		this.carModel = carModel;
		this.carColor = carColor;
	}
}
