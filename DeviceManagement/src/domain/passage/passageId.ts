
import { Entity } from "../../core/domain/Entity";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

export class PassageId extends Entity<any> {

  get id (): UniqueEntityID {
    return this.id;
  }

  private constructor (id: UniqueEntityID) {
    super(null, id);
  }
  public static create(id: string): PassageId {
    const uniqueId = new UniqueEntityID(id);
    return new PassageId(uniqueId);
  }
}