import joi from "joi";

export const hazardreportSchema = joi.object({
  title: joi.string().required(),
  hazardtype: joi.string().required(),
  description: joi.string().required(),
  images: joi.array().items(joi.string()),
  longitude: joi.string().required(),
  latitude: joi.string().required(),
  city: joi.string().required(),
  country: joi.string().required(),
  user: joi.string()
});