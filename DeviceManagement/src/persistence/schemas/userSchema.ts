import { IUserPersistence } from '../../dataschema/IUserPersistence';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    firstName: {
      type: String,
      required: [true, 'Please enter first name'],
      index: true,
    },

    lastName: {
      type: String,
      required: [true, 'Please enter last name'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,  
      index: true,
    },

    password: String,

    salt: String,

    role: {
      type: String,
    },
    phone: {
      type: Number,
      unique: true,
      required: [true, 'Please enter phone number'],
    },
    state:{
      type:String,
      default:"WAITING",
    },
    taxPayerNumber:{
      type:Number,
      default:0,
    }
  },
  { timestamps: true },
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', User);
