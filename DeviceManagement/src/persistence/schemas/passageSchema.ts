import { IPassagePersistence } from '../../dataschema/IPassagePersistence';
import mongoose from 'mongoose';

const PassageSchema = new mongoose.Schema(
  {
    domainId:{type: String, unique:true},
    location: {type:String},
    floorBuilding1: {type: String},
    floorBuilding2: {type: String},
    fb1x: {type: Number},
    fb1y: {type: Number},
    fb2x: {type: Number},
    fb2y: {type: Number},
    passageCode:{type:String}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPassagePersistence & mongoose.Document>('Passage', PassageSchema);