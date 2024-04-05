import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { userService, contactService, spamService } from "../services";
import exclude from "../utils/exclude";

const searchByName = catchAsync(async (req, res) => {
  const { query } = req.body;
  const usersNameStartsWith = await userService.getUserByNameMatchFirst(query, [
    "id",
    "name",
    "phoneNumber",
  ]);
  const usersNameContains = await userService.getUserByNameMatchContains(
    query,
    ["id", "name", "phoneNumber"]
  );
  const contactsNameStartsWith =
    await contactService.getContactByNameMatchFirst(query, [
      "id",
      "name",
      "phoneNumber",
    ]);
  const contactsNameContains =
    await contactService.getContactByNameMatchContains(query, [
      "id",
      "name",
      "phoneNumber",
    ]);

  const spamFrequencyTable = await spamService.getSpamFrequencyTable();

  res.status(httpStatus.OK).send([
    ...usersNameStartsWith.map((user) => {
      if (spamFrequencyTable[user.phoneNumber]) {
        return {
          ...user,
          spamCount: spamFrequencyTable[user.phoneNumber],
          type: "registeredUser",
        };
      } else
        return {
          ...user,
          type: "registeredUser",
        };
    }),
    ...contactsNameStartsWith.map((user) => {
      if (spamFrequencyTable[user.phoneNumber]) {
        return {
          ...user,
          spamCount: spamFrequencyTable[user.phoneNumber],
          type: "contact",
        };
      } else
        return {
          ...user,
          type: "contact",
        };
    }),
    ...usersNameContains.map((user) => {
      if (spamFrequencyTable[user.phoneNumber]) {
        return {
          ...user,
          spamCount: spamFrequencyTable[user.phoneNumber],
          type: "registeredUser",
        };
      } else
        return {
          ...user,
          type: "registeredUser",
        };
    }),
    ...contactsNameContains.map((user) => {
      if (spamFrequencyTable[user.phoneNumber]) {
        return {
          ...user,
          spamCount: spamFrequencyTable[user.phoneNumber],
          type: "contact",
        };
      } else
        return {
          ...user,
          type: "contact",
        };
    }),
  ]);
});

const searchByPhoneNumber = catchAsync(async (req, res) => {
  const { phoneNumber } = req.body;
  const registeredUserWithPhone = await userService.getUserByPhoneNumber(
    phoneNumber,
    ["id", "name", "phoneNumber"]
  );
  if (registeredUserWithPhone) {
    res.status(httpStatus.OK).send([registeredUserWithPhone]);
    return;
  }
  const registeredContactsWithPhone =
    await contactService.getContactsByPhoneNumber(phoneNumber, [
      "id",
      "name",
      "phoneNumber",
    ]);
  res.status(httpStatus.OK).send(registeredContactsWithPhone);
});

export default {
  searchByName,
  searchByPhoneNumber,
};
