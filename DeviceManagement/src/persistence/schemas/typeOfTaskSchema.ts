
import mongoose from 'mongoose';
import { ITypeOfTaskPersistence } from '../../dataschema/ITypeOfTaskPersistence';

const TypeOfTaskSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    designation: { type: String, unique: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITypeOfTaskPersistence & mongoose.Document>('TypeOfTask', TypeOfTaskSchema);
