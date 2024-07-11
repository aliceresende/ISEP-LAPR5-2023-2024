import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface IBrandProps {
	value: string;
}

export class RobotTypeBrand extends ValueObject<IBrandProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(brand: string): Result<RobotTypeBrand> {
		const guardResult = Guard.againstNullOrUndefined(brand, 'brand');

		if (!guardResult.succeeded) {
			return Result.fail<RobotTypeBrand>(guardResult.message);
		} else {
			return Result.ok<RobotTypeBrand>(new RobotTypeBrand({value: brand}))
		}
	}
	
}