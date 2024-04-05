import Joi from "joi";

const searchByName = {
  body: Joi.object().keys({
    query: Joi.string().required(),
  }),
};

const searchByPhoneNumber = {
    body: Joi.object().keys({
      phoneNumber: Joi.string().required(),
    }),
  };

export default {
  searchByName,
  searchByPhoneNumber
};
