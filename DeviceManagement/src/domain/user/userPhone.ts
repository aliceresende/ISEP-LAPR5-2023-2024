import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface UserPhoneProps {
  value: number;
}

export class UserPhone extends ValueObject<UserPhoneProps>{
  get value() : number{
    return this.props.value;
  }

  private constructor (props: UserPhoneProps) {
    super(props);
  }

  public static create (phone: number): Result<UserPhone> {
    const guardResult = Guard.againstNullOrUndefined(phone, 'phone');
    if (!guardResult.succeeded || phone < 100000000 || phone > 999999999) {
      return Result.fail<UserPhone>('Phone Number cannot be null');
    } else {
      return Result.ok<UserPhone>(new UserPhone({ value: phone }))
    }
  }
}
