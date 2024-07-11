export default interface IRoomDTO {
  floor: string;
  name: string;
  xDimension: number;
  yDimension: number; // obrigatory if it has brand
  roomType: string;
  doorx: number;
  doory: number;
  description: string;
  superiorCornerX: number;
  superiorCornerY: number;
}
