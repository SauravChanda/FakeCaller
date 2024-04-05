import httpStatus from "http-status";
import tokenService from "./token.service";
import userService from "./user.service";
import ApiError from "../utils/ApiError";
import { TokenType, User } from "@prisma/client";
import prisma from "../client";
import { encryptPassword, isPasswordMatch } from "../utils/encryption";
import { AuthTokensResponse } from "../types/response";
import exclude from "../utils/exclude";

/**
 * Login with phoneNumber and password
 * @param {string} phoneNumber
 * @param {string} password
 * @returns {Promise<Omit<User, 'password'>>}
 */
const loginUserWithPhoneNumberAndPassword = async (
  phoneNumber: string,
  password: string
): Promise<Omit<User, "password">> => {
  const user = await userService.getUserByPhoneNumber(phoneNumber, [
    "id",
    "email",
    "name",
    "phoneNumber",
    "password",
    "createdAt",
    "updatedAt",
  ]);
  if (!user || !(await isPasswordMatch(password, user.password as string))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return exclude(user, ["password"]);
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenData = await prisma.token.findFirst({
    where: {
      token: refreshToken,
      type: TokenType.REFRESH,
      blacklisted: false,
    },
  });
  if (!refreshTokenData) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await prisma.token.delete({ where: { id: refreshTokenData.id } });
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<AuthTokensResponse>}
 */
const refreshAuth = async (
  refreshToken: string
): Promise<AuthTokensResponse> => {
  try {
    const refreshTokenData = await tokenService.verifyToken(
      refreshToken,
      TokenType.REFRESH
    );
    const { userId } = refreshTokenData;
    await prisma.token.delete({ where: { id: refreshTokenData.id } });
    return tokenService.generateAuthTokens({ id: userId });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

export default {
  loginUserWithPhoneNumberAndPassword,
  isPasswordMatch,
  encryptPassword,
  logout,
  refreshAuth,
};
