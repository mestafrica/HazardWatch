import mongoose, {Schema} from "mongoose";
import IUser from "../interfaces/hazardtypes";

const UserSchema: Schema = new Schema({
    hazardType:{ type: String, enum: ['Air Quality', 'Water Contamination', 'Noise Levels'] },
    description:{type: String, required:true},
    images:{type: String, required:true},
    latitude:{type: String, required:true},
    longitude:{type: String, required:true},
    city:{type: String, required:true},
    country:{type: String, required:true},

},
{
    timestamps:true
})

export default mongoose.model<IUser>('User', UserSchema)