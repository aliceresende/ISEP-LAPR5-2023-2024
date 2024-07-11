
import { Floor } from '../domain/floor/floor';

export interface IElevatorDTO {
  id: string;
  building: string;
  floors: string[];
  brand: string;
  model: string;
  seriesNumber: string;
  description: string;
  x: number;
  y: number;
  location: string;
}
