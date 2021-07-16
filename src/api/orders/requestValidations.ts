import * as Joi from "joi";

export const create: any = {
  headers: Joi.object({
    authorization: Joi.string()
      .required()
      .error(Error(" Authorization Token is Required")),
  }).options({ allowUnknown: true }),
  payload: Joi.object({
    products: Joi.array().items(Joi.object({
      product: Joi.object().required(),
      quantity: Joi.number().required()
    })),   
  }),
};

export const getAll: any = {
  headers: Joi.object({
    authorization: Joi.string()
      .required()
      .error(Error(" Authorization Token is Required")),
  }).options({ allowUnknown: true }),
};