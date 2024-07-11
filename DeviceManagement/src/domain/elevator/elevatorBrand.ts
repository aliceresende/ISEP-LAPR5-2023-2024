import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface IBrandProps {
	value: string;
}

export class ElevatorBrand extends ValueObject<IBrandProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(brand: string): Result<ElevatorBrand> {
		console.log("entrou no create do brand");
		const guardResult = Guard.againstNullOrUndefined(brand, 'brand');

		if (!guardResult.succeeded) {
			console.log("entro no if do brand");
			return Result.fail<ElevatorBrand>(guardResult.message);
		} else {
			console.log("entrou no else do brand");
			return Result.ok<ElevatorBrand>(new ElevatorBrand({value: brand}))
		}
	}
	
}