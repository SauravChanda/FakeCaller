import Joi from "joi";

const markSpam = {
  body: Joi.object().keys({
    phoneNumber: Joi.string().required(),
  }),
};

const unmarkSpam = {
  body: Joi.object().keys({
    phoneNumber: Joi.string().required(),
  }),
};

export default {
  markSpam,
  unmarkSpam
};
