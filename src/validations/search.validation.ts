import Joi from "joi";

const searchByName = {
  body: Joi.object().keys({
    query: Joi.string().required(),
  }),
};

export default {
  searchByName,
};
