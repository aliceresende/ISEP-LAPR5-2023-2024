
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import config from "../../../config";

interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: UserEmailProps) {
    super(props);
  }

  public static create (email: string): Result<UserEmail> {
    const guardResult = Guard.againstNullOrUndefined(email, 'email');
    if (!guardResult.succeeded) {
      return Result.fail<UserEmail>(guardResult.message);
    } else {
      const acceptedEmail = config.acceptedEmailExtension;
      const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@${acceptedEmail}$`, 'i');

      if (!emailRegex.test(email)) {
        return Result.fail<UserEmail>('Email is not valid for this system.');
      }

      return Result.ok<UserEmail>(new UserEmail({ value: email }))
    }
  }
}