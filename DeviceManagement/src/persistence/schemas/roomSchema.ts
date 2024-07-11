import { IRoomPersistence } from '../../dataschema/IRoomPersistence';
import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    floor: { type: String },
    name: { type: String, max: 50 },
    xDimension: { type: Number, min: 1 },
    yDimension: { type: Number, min: 1 },
    roomType: {
      type: String,
    },
    doorx: { type: Number, min: 1 },
    doory: { type: Number, min: 1 },
    description: { type: String, max: 250 },
    superiorCornerX: { type: Number, min: 0 },
    superiorCornerY: { type: Number, min: 0 },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IRoomPersistence & mongoose.Document>('Room', RoomSchema);
