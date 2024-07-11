import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface ISeriesNumbersProps {
	value: string;
}

export class RobotSeriesNumber extends ValueObject<ISeriesNumbersProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(seriesNumber: string): Result<RobotSeriesNumber> {
		const guardResult = Guard.againstNullOrUndefined(seriesNumber, 'seriesNumber');

		if (!guardResult.succeeded) {
			return Result.fail<RobotSeriesNumber>(guardResult.message);
		} else {
			return Result.ok<RobotSeriesNumber>(new RobotSeriesNumber({value: seriesNumber}))
		}
	}
}