import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/user/user";
import { UserEmail } from "../../domain/user/userEmail";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findByEmail (email: UserEmail | string): Promise<User>;
	findById (id: string): Promise<User>;
	delete(email:UserEmail | string): Promise<User>;
	getAll(): Promise<IUserDTO[]>;
	getWaitingUsers(): Promise<IUserDTO[]>;
}
  