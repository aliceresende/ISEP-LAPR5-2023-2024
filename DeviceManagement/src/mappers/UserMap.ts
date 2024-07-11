import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IUserDTO} from "../dto/IUserDTO";

import { User } from "../domain/user/user";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { UserEmail } from "../domain/user/userEmail";
import { UserPassword } from "../domain/user/userPassword";

import RoleRepo from "../repos/roleRepo";
import { UserPhone } from '../domain/user/userPhone';
import { UserTaxPayerNumber } from '../domain/user/userTaxPayerNumber';
import { UserState } from '../domain/user/userState';

export class UserMap extends Mapper<User> {

  public static toDTO( user: User): IUserDTO {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      password: user.password.value,
      phone: user.phone.value,
      role: user.role.name,
      state: user.state.userState,
      taxPayerNumber: user.taxPayerNumber.value,
    } as IUserDTO;
  }

  public static async toDomain (raw: any): Promise<User> {
    const userEmailOrError = UserEmail.create(raw.email);
    const userPasswordOrError = UserPassword.create({value: raw.password, hashed: true});
    const userPhoneOrError = UserPhone.create(raw.phone);
    const taxPayerNumber = UserTaxPayerNumber.create(raw.taxPayerNumber);
    const state = UserState.create(raw.state);

    const repo = Container.get(RoleRepo);
    const role = await repo.findByName(raw.role);

    const userOrError = User.create({
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: userEmailOrError.getValue(),
      password: userPasswordOrError.getValue(),
      phone: userPhoneOrError.getValue(),
      role: role,
      state: state.getValue(),
      taxPayerNumber: taxPayerNumber.getValue(),
    }, new UniqueEntityID(raw.domainId))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  
  public static toPersistence (user: User): any {
    const a = {
      domainId: user.id.toString(),
      email: user.email.value,
      password: user.password.value,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.name,
      phone: user.phone.value,
      state: user.state.userState,
      taxPayerNumber: user.taxPayerNumber.value,
    }
    return a;
  }
}