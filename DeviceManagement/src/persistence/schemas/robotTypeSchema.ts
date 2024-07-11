
import mongoose from 'mongoose';
import { IRobotTypePersistence } from '../../dataschema/IRobotTypePersistence';
import { TypeOfTask } from '../../domain/typeOfTask/typeOfTask';

const RobotType = new mongoose.Schema(

    {
        domainId: { 
        type: String,
        unique: true
        },
    
        robotType: {
        type: String,
        index: true,
        maxLength: 25
        },
    
        brand: {
        type: String,
        index: true,
        maxLength: 50
        },
    
        model: {
        type: String,
        index: true,
        maxLength: 100
        },

        typeOfTasks:{
            type: [String],
            required: true,
            index: true,
        }
    },
    { timestamps: true },
    );

export default mongoose.model<IRobotTypePersistence & mongoose.Document>('RobotType', RobotType);