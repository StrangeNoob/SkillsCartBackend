import * as Joi from "joi";

export const create: any = {
  headers: Joi.object({
    authorization: Joi.string()
      .required()
      .error(Error(" Authorization Token is Required"))
  }).options({ allowUnknown: true }),
  payload: Joi.object({
    name: Joi.string()
      .required()
      .error(Error("Product Name is Required")),
    description: Joi.string()
      .required()
      .error(Error("Product Description is Required")),
    image: Joi.string()
      .required()
      .error(Error("Product Image is Required")),
    price: Joi.number()
      .required()
      .error(Error("Product Price is Required")),
  }),
};

export const update: any = {
    headers: Joi.object({
        authorization: Joi.string()
          .required()
          .error(Error(" Authorization Token is Required"))
      }).options({ allowUnknown: true }),
      params: Joi.object({
        productId: Joi.string()
          .required()
          .error(new Error("Product Id is required")),
      }),
      payload: Joi.object({
        name: Joi.string()
          .required()
          .error(Error("Product Name is Required")),
        description: Joi.string()
          .required()
          .error(Error("Product Description is Required")),
        image: Joi.string()
          .required()
          .error(Error("Product Image is Required")),
        price: Joi.number()
          .required()
          .error(Error("Product Price is Required")),
      }),
};
export const getAll: any = {

};
export const get: any = {
    params: Joi.object({
        productId: Joi.string()
          .required()
          .error(new Error("Product Id is required")),
      }),
};
