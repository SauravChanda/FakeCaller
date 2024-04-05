import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { authService, userService, tokenService } from "../services";
import exclude from "../utils/exclude";

const register = catchAsync(async (req, res) => {
  const { phoneNumber, name, password } = req.body;
  const user = await userService.createUser(phoneNumber, name, password);
  const userWithoutPassword = exclude(user, [
    "password",
    "createdAt",
    "updatedAt",
  ]);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user: userWithoutPassword, tokens });
});

const login = catchAsync(async (req, res) => {
  const { phoneNumber, password } = req.body;
  const user = await authService.loginUserWithPhoneNumberAndPassword(
    phoneNumber,
    password
  );
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

export default {
  register,
  login,
  logout,
  refreshTokens,
};
