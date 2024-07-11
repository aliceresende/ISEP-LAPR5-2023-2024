import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Floor } from '../floor/floor';
import { Guard } from '../../core/logic/Guard';
import { RoomId } from './roomId';

export interface RoomProps {
  floor: Floor;
  name: string;
  xDimension: number;
  yDimension: number;
  roomType: string;
  doorx: number;
  doory: number;
  description: string;
  superiorCornerX: number;
  superiorCornerY: number;
}

export class Room extends AggregateRoot<RoomProps> {
  get id(): UniqueEntityID {
    return this._id;
  }
  get roomId(): RoomId {
    return RoomId.caller(this.id);
  }

  get floor(): Floor {
    return this.props.floor;
  }

  get floorNumber(): string{
    return this.props.floor.floorNumber.value;
  }

  get building(): string{
    return this.props.floor.buildingName;
  }

  get name(): string {
    return this.props.name;
  }

  get xDimension(): number {
    return this.props.xDimension;
  }

  get yDimension(): number {
    return this.props.yDimension;
  }

  get doorx(): number {
    return this.props.doorx;
  }

  get doory(): number {
    return this.props.doory;
  }

  get roomType(): string {
    return this.props.roomType;
  }

  get description(): string {
    return this.props.description;
  }

  get superiorCornerX(): number {
    return this.props.superiorCornerX;
  }

  get superiorCornerY(): number {
    return this.props.superiorCornerY;
  }
  private constructor(props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: RoomProps, id?: UniqueEntityID): Result<Room> {
    const guardedProps = [
      { argument: props.floor, argumentName: 'floor' },
      { argument: props.name, argumentName: 'name' },
      { argument: props.xDimension, argumentName: 'xDimension' },
      { argument: props.yDimension, argumentName: 'yDimension' },
      { argument: props.doorx, argumentName: 'doorx' },
      { argument: props.doory, argumentName: 'doory' },
      { argument: props.roomType, argumentName: 'roomType' },
      { argument: props.description, argumentName: 'description' },
      { argument: props.superiorCornerX, argumentName: 'superiorCornerX' },
      { argument: props.superiorCornerY, argumentName: 'superiorCornerY' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Room>(guardResult.message);
    } else {
      const room = new Room(
        {
          ...props,
        },
        id,
      );
      return Result.ok<Room>(room);
    }
  }
}
