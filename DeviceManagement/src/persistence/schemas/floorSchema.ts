import { IFloorPersistence } from '../../dataschema/IFloorPersistence';
import mongoose from 'mongoose';

const FloorSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    description: { type: String, max:250},
    floorNumber: { type: String},
    floorBuilding: {type: String},
    map:{type:String}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', FloorSchema);
