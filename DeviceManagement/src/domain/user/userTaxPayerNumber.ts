import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface UserTaxPayerNumberProps {
  value: number;
}

export class UserTaxPayerNumber extends ValueObject<UserTaxPayerNumberProps>{
  get value() : number{
    return this.props.value;
  }

  private constructor (props: UserTaxPayerNumberProps) {
    super(props);
  }

  public static create (taxPayerNumber: number): Result<UserTaxPayerNumber> {
    console.log(taxPayerNumber);
    const guardResult = Guard.againstNullOrUndefined(taxPayerNumber, 'taxPayerNumber');

    if (!guardResult.succeeded) {
      return Result.fail<UserTaxPayerNumber>('Tax Payer Number cannot be null');
    }else if(taxPayerNumber < 0|| taxPayerNumber > 1000000000) {
      return Result.fail<UserTaxPayerNumber>('Tax Payer Number must be between 0 and 1000000000');
    } else {
      return Result.ok<UserTaxPayerNumber>(new UserTaxPayerNumber({ value: taxPayerNumber}))
    }
  }
}
