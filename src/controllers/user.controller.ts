import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { userService, spamService } from "../services";
import exclude from "../utils/exclude";
import { User } from "@prisma/client";

const createUser = catchAsync(async (req, res) => {
  const { email, password, name, role } = req.body;
  const user = await userService.createUser(email, password, name, role);
  res.status(httpStatus.CREATED).send(user);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const spamFrequency = await spamService.getSpamFrequencyForNumber(user.phoneNumber);
  const userRes = {
    ...user,
    spamCount: spamFrequency 
  }

  let excludedKeys = ["password", "createdAt", "updatedAt"];

  if(!user.email) excludedKeys.push("email")

  res.send(exclude(userRes, excludedKeys as Array<keyof User>));
});

export default {
  createUser,
  getUser,
};
