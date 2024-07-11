import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface INumberProps {
	value: string;
}

export class FloorNumber extends ValueObject<INumberProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(Number: string): Result<FloorNumber> {
		const guardResult = Guard.againstNullOrUndefined(Number, 'Number');

		if (!guardResult.succeeded) {
			return Result.fail<FloorNumber>(guardResult.message);
		} else {
			return Result.ok<FloorNumber>(new FloorNumber({value: Number}))
		}
	}
	
}