import { Repo } from "../../core/infra/Repo";
import { Result } from "../../core/logic/Result";
import { Passage } from "../../domain/passage/passage";
import { PassageId } from "../../domain/passage/passageId";
import IPassageDTO from "../../dto/IPassageDTO";

export default interface IPassageRepo extends Repo<Passage> {
	getAllPassageIDs(): Promise<string[]>;
	save(passage: Passage): Promise<Passage>;
	findById (passageId: PassageId | string): Promise<Passage>;
	findAll(): Promise<Passage[]>;
	findByDomainId (passageId: PassageId | string): Promise<Passage>;
	exists (passageId: PassageId | string): Promise<boolean>;
	listPassage(building1: string,building2: string): Promise<Passage[]>;
	findAllByBuilding(building1: string, building2: string): Promise<string[]> 
}
  