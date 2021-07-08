import * as Joi from "joi";

export const login: any = {
    payload: Joi.object({
      name: Joi.string()
        .required()
        .error(Error("User Name is Required")),
      email: Joi.string()     
        .email()
        .required()
        .error(Error("User Email is Required")),
      firebaseUid: Joi.string()
        .required()
        .error(Error("user FirebaseUid is Required")),
      photoUrl: Joi.string()
        .uri()
        .optional()
        .error(Error("User Image is Required"))
    }),
  };
  
  export const update: any = {
      headers: Joi.object({
          authorization: Joi.string()
            .required()
            .error(Error(" Authorization Token is Required"))
        }).options({ allowUnknown: true }),
        payload: Joi.object({
            name: Joi.string()
            .required()
            .error(Error("User Name is Required")),
          email: Joi.string()     
            .email()
            .required()
            .error(Error("User Email is Required")),
          firebaseUid: Joi.string()
            .required()
            .error(Error("user FirebaseUid is Required")),
          photoUrl: Joi.string()
            .uri()
            .optional()
            .error(Error("User Image is Required"))
        }),
  };
  export const getAll: any = {
    headers: Joi.object({
        authorization: Joi.string()
          .required()
          .error(Error(" Authorization Token is Required"))
      }).options({ allowUnknown: true })
  };
  export const get: any = {
    headers: Joi.object({
        authorization: Joi.string()
          .required()
          .error(Error(" Authorization Token is Required"))
      }).options({ allowUnknown: true }),
  };
  
