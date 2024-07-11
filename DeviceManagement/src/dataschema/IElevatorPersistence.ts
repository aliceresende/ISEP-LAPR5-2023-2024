import { Floor } from "../domain/floor/floor";

export interface IElevatorPersistence {
	domainId: string;
	building: string;
	floors: string[];
	brand: string;
    model: string;
    seriesNumber: string;
	description: string;
	x: string;
	y: string;
	location: string;
  }