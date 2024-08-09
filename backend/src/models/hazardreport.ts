import mongoose, { Schema , Types} from 'mongoose';
import IHazardReport from '../interfaces/hazardreport';

const hazardReportSchema: Schema = new Schema({
    title: { type: String, required: true },
    hazardtype: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: String, required: true },
    longitude: { type: String, required: true },
    latitude: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    user: {type: Types.ObjectId, ref: 'User', select:false}
}, {
    timestamps: true
  });

export default mongoose.model<IHazardReport>('HazardReport', hazardReportSchema);
