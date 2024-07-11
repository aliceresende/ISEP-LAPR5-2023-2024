import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface ILocationProps {
	value: string;
}

export class ElevatorLocation extends ValueObject<ILocationProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(Location: string): Result<ElevatorLocation> {
		console.log("entrou no create do Location");
		const guardResult = Guard.againstNullOrUndefined(Location, 'Location');

		if (!guardResult.succeeded) {
			console.log("entro no if do Location");
			return Result.fail<ElevatorLocation>(guardResult.message);
		} else {
			console.log("entrou no else do Location");
			return Result.ok<ElevatorLocation>(new ElevatorLocation({value: Location}))
		}
	}
	
}