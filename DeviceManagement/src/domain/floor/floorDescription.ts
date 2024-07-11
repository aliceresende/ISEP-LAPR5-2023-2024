import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface IDescriptionProps {
	value: string;
}

export class FloorDescription extends ValueObject<IDescriptionProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(description: string): Result<FloorDescription> {
		const guardResult = Guard.againstNullOrUndefined(description, 'description');

		if (!guardResult.succeeded) {
			console.log("Chegou ao if do value object Description");
			return Result.fail<FloorDescription>(guardResult.message);
		} else {
				console.log("Chegou ao else do value object Description");
			return Result.ok<FloorDescription>(new FloorDescription({value: description}))
		}
	}
	
}