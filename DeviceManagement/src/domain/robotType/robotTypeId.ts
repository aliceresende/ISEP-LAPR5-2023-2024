import { Entity } from "../../core/domain/Entity";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

export class RobotTypeId extends Entity<any> {
  get id(): UniqueEntityID {
    return this.id;
  }

  private constructor(id: UniqueEntityID) {
    super(null, id);
  }

  public static create(id: string): RobotTypeId {
    const uniqueId = new UniqueEntityID(id);
    return new RobotTypeId(uniqueId);
  }
}
