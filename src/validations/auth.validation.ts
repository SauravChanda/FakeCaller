import Joi from "joi";
import { password } from "./custom.validation";

const register = {
  body: Joi.object().keys({
    phoneNumber: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required().custom(password),
    email: Joi.string().email(),
  }),
};

const login = {
  body: Joi.object().keys({
    phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export default {
  register,
  login,
  logout,
  refreshTokens
};
