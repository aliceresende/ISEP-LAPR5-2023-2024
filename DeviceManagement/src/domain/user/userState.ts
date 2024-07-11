import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

enum UserStateEnum {
    WAITING = "Waiting",
    // If the admin creates a manager it's automatically accepted
    ACCEPTED = "Accepted",
    DENIED = "Denied",
    DELETED = "Deleted"
}

interface UserStateProps {
    userState: string;
}

export class UserState extends ValueObject<UserStateProps> {
  
  get userState(): string {
    return this.props.userState;
  }

  private constructor(props: UserStateProps) {
    super(props);
  }

  public static create(userState: string): Result<UserState> {
    
    if (userState.length === 0) {
      return Result.fail<UserState>('Insert user State!');
    }
    

    const userStateValue = UserStateEnum[userState.toUpperCase()] as UserStateEnum;   

    return Result.ok<UserState>(new UserState({ userState: userStateValue }));
  }

public accept(actualState: UserState): Result<UserState> {
  
  // Check if the current state is waiting before accepting
  if (!actualState.userState.includes(UserStateEnum.WAITING)) {
    return Result.fail<UserState>("User can only be accepted from the 'Waiting' state.");
  }
  return Result.ok<UserState>(new UserState({ userState:  UserStateEnum.ACCEPTED }));
}

public deny(actualState: UserState): Result<UserState> {
   // Check if the current state is waiting before accepting
  if (!actualState.userState.includes(UserStateEnum.WAITING)) {
    return Result.fail<UserState>("User can only be denied from the 'Waiting' state.");
  }
  return Result.ok<UserState>(new UserState({ userState: UserStateEnum.DENIED }));
}

public delete(): Result<UserState> {
  // Assuming the user can be deleted from any state
  console.log("verifica condição");
  return Result.ok<UserState>(new UserState({ userState: UserStateEnum.DELETED}));
}

}