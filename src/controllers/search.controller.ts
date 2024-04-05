import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { userService, contactService } from "../services";
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

  res.status(httpStatus.OK).send({
    users: {
      startsWith: usersNameStartsWith,
      contains: usersNameStartsWith,
    },
    contacts: {
      startsWith: contactsNameStartsWith,
      contains: contactsNameContains,
    },
  });
});

const searchByPhoneNumber = catchAsync(async (req, res) => {
  const { phoneNumber } = req.body;
  const registeredUserWithPhone = await userService.getUserByPhoneNumber(
    phoneNumber,
    ["id", "name", "phoneNumber"]
  );
  if (registeredUserWithPhone) {
    res.status(httpStatus.OK).send([registeredUserWithPhone]);
  }
  const registeredContactsWithPhone = await contactService.getContactsByPhoneNumber(
    phoneNumber,
    ["id", "name", "phoneNumber"]
  );
  res.status(httpStatus.OK).send(registeredContactsWithPhone);
});

export default {
  searchByName,
  searchByPhoneNumber
};
