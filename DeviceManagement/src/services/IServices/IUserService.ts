import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService  {
  SignUp(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>;
  createUser(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> 
  deleteUser(email: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>;
  activateUser(email: string): Promise<Result<IUserDTO>>;
  deactivateUser(email: string): Promise<Result<IUserDTO>>;
  getUsers(): Promise<Result<IUserDTO[]>>;
  getWaitingUsers(): Promise<Result<IUserDTO[]>>;
  updateUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
}
