import Joi from "joi";

const getContact = {
  params: Joi.object().keys({
    contactId: Joi.string(),
  }),
};

export default {
  getContact,
};
