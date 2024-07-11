import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface IYProps {
	value: number;
}

export class ElevatorY extends ValueObject<IYProps> {

	get value(): number {
		return this.props.value;
	}

	public static create(Y: number): Result<ElevatorY> {
		console.log("entrou no create do Y");
		const guardResult = Guard.againstNullOrUndefined(Y, 'Y');

		if (!guardResult.succeeded) {
			console.log("entro no if do Y");
			return Result.fail<ElevatorY>(guardResult.message);
		} else {
			console.log("entrou no else do Y");
			return Result.ok<ElevatorY>(new ElevatorY({value: Y}))
		}
	}
	
}