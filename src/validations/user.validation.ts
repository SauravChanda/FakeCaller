import Joi from "joi";
import { password } from "./custom.validation";

const createUser = {
  body: Joi.object().keys({
    phoneNumber: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required().custom(password),
    email: Joi.string().email(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
};

export default {
  createUser,
  getUser,
};
