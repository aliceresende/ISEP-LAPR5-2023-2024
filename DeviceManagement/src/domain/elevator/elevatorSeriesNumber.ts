import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface ISeriesNumbersProps {
  value: string;
}

export class ElevatorSeriesNumber extends ValueObject<ISeriesNumbersProps> {
  get value(): string {
    return this.props.value;
  }

  public static create(seriesNumber: string): Result<ElevatorSeriesNumber> {
    const guardResult = Guard.againstNullOrUndefined(seriesNumber, 'seriesNumber');

    if (!guardResult.succeeded) {
      return Result.fail<ElevatorSeriesNumber>(guardResult.message);
    } else {
      return Result.ok<ElevatorSeriesNumber>(new ElevatorSeriesNumber({ value: seriesNumber }));
    }
  }
}
