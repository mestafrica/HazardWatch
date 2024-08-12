import { Document, Types } from "mongoose";

export default interface IHazardReport extends Document {
  title: String;
  hazardtype: String;
  description: String;
  images: String[];
  longitude: String;
  latitude: String;
  city: String;
  country: String;
  // user: String;
  user: Types.ObjectId;
}
