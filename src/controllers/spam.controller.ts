import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { spamService } from "../services";
import { User } from "@prisma/client";
import ApiError from "../utils/ApiError";

const markSpam = catchAsync(async (req, res) => {
  const { phoneNumber } = req.body;
  const user = req.user as User;
  if (user.phoneNumber === phoneNumber)
    throw new ApiError(httpStatus.BAD_REQUEST, "Cannot mark ourselves as spam");
  const spamEntry = await spamService.markSpam(phoneNumber, user.id);
  res.status(httpStatus.CREATED).send("Marked Spam!");
});

const unmarkSpam = catchAsync(async (req, res) => {
  const { phoneNumber } = req.body;
  const user = req.user as User;
  const spamEntry = await spamService.unmarkSpam(phoneNumber, user.id);
  res.status(httpStatus.CREATED).send("Removed Spam!");
});

export default {
  markSpam,
  unmarkSpam,
};
