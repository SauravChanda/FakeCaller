import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { userService } from "../services";
import exclude from "../utils/exclude";

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

  res.send(exclude(user, ["password", "createdAt", "updatedAt"]));
});

export default {
  createUser,
  getUser,
};
