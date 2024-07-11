
import mongoose from 'mongoose';
import { IRobotPersistence } from '../../dataschema/IRobotPersistence';
const Robot = new mongoose.Schema(

    {
        domainId: { 
        type: String,
        unique: true
        },

        code: {
            type: String,
            index: true,
            maxLength: 30
            },
        nickname: {
            type: String,
            index: true,
            maxLength: 30
            },
        seriesNumber: {
            type: String,
            index: true,
            maxLength: 50
            },
          description: {
            type: String,
            index: true,
            maxLength: 250
            },  
        robotType: {
        type: String,
        index: true
        },
        status:{
            type: Boolean,
        }
    
       
    },
    { timestamps: true },
    );

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', Robot);