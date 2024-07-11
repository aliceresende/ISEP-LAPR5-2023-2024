import mongoose from 'mongoose';
import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';

const Building = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    code: {
      type: String,
      required: [true, 'Please enter the building code'],
      index: true,
      max:5
    },

    name: {
      type: String,
      index: true,
      max:50
    },

    description: {
      type: String,
      index: true,
      max:255
    },

    x: {
      type: Number,
    },
    y: {
      type: Number,
    },

    
  },
  { timestamps: true },
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', Building);
