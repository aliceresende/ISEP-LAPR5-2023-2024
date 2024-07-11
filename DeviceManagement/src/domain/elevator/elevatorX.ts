import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface IXProps {
	value:number;
}

export class ElevatorX extends ValueObject<IXProps> {

	get value(): number {
		return this.props.value;
	}

	public static create(X: number): Result<ElevatorX> {
		console.log("entrou no create do X");
		const guardResult = Guard.againstNullOrUndefined(X, 'X');

		if (!guardResult.succeeded) {
			console.log("entro no if do X");
			return Result.fail<ElevatorX>(guardResult.message);
		} else {
			console.log("entrou no else do X");
			return Result.ok<ElevatorX>(new ElevatorX({value: X}))
		}
	}
	
}