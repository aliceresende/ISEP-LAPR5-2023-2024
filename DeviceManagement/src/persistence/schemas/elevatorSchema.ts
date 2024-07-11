import mongoose from 'mongoose';
import { Floor } from '../../domain/floor/floor';
import { IElevatorPersistence } from '../../dataschema/IElevatorPersistence';

const ElevatorSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    building: { type: String },
    floors: [{
      type: String,
      required: true
  }],
    brand: { type: String },
    model: { type: String },
    seriesNumber: { type: String },
    description: { type: String },
    x: { type: Number },
    y: { type: Number },
    location: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', ElevatorSchema);
