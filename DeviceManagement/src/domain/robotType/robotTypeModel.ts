import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface IModelProps {
	value: string;
}

export class RobotTypeModel extends ValueObject<IModelProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(model: string): Result<RobotTypeModel> {
		const guardResult = Guard.againstNullOrUndefined(model, 'model');

		if (!guardResult.succeeded) {
			return Result.fail<RobotTypeModel>(guardResult.message);
		} else {
			return Result.ok<RobotTypeModel>(new RobotTypeModel({value: model}))
		}
	}
}