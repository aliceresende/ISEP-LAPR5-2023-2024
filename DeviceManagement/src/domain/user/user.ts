import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { Role } from "../role/role";
import { UserPassword } from "./userPassword";
import { Guard } from "../../core/logic/Guard";
import { UserPhone } from "./userPhone";
import { UserTaxPayerNumber } from "./userTaxPayerNumber";
import { UserState } from "./userState";
import { create } from "lodash";


interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password: UserPassword;
  role: Role;
  phone: UserPhone;
  state: UserState;
  taxPayerNumber:UserTaxPayerNumber;
}

export class User extends AggregateRoot<UserProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): UserId {
    return UserId.caller(this.id)
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get firstName (): string {
    return this.props.firstName
  }

  get lastName (): string {
    return this.props.lastName;
  }

  get password (): UserPassword {
    return this.props.password;
  }

  get role (): Role {
    return this.props.role;
  }

  get phone (): UserPhone {
    return this.props.phone;
  }

  get state (): UserState {
    return this.props.state;
  }

  get taxPayerNumber (): UserTaxPayerNumber {
    return this.props.taxPayerNumber;
  }
  set taxPayerNumber(value){
    this.props.taxPayerNumber = value;
  }
  set firstName (value: string) {
    this.props.firstName = value;
  }
  set lastName (value: string) {
    this.props.lastName = value;
  }
  
  set phone(value){
    this.props.phone = value;
  }

  set role (value: Role) {
      this.props.role.name = value.name;
  }

  set password (value: UserPassword) {
      this.props.password = value;
  }

  accept(): Result<UserState> {
    // Check if the user can be accepted
    const result = this.props.state.accept(this.props.state);
    // If the operation was successful, update the user state
    if (result.isSuccess) {
      this.props.state = result.getValue();
    }
    return result;
  }

  deny(){
    // Check if the user can be denied
    const result = this.props.state.deny(this.props.state);
    // If the operation was successful, update the user state
    if (result.isSuccess) {
      this.props.state = result.getValue();
    }
    return result;
  }

  delete(){
    // Check if the user can be deleted
    console.log("Entra no deny no user");
    const result = this.props.state.delete();
    // If the operation was successful, update the user state
    
    console.log("result",result);
    if (result.isSuccess) {
      this.props.state = result.getValue();
      console.log("user state",this.props.state);
    }
    return result;
  }

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {

    const guardedProps = [
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.password, argumentName: 'password' },
      { argument: props.role, argumentName: 'role' },
      { argument: props.phone, argumentName: 'phone' },
      { argument: props.state, argumentName:'state' },
      { argument: props.taxPayerNumber, argumentName: 'taxPayerNumber' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    console.log("guard",guardResult);
    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    } else {
      const user = new User({
        ...props
      }, id);
      return Result.ok<User>(user);
    }
  }

  
    
}
