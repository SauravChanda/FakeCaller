import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { contactService } from "../services";
import exclude from "../utils/exclude";
import { Contact, User } from "@prisma/client";

const getContact = catchAsync(async (req, res) => {
  const contact = await contactService.getContactById(req.params.contactId);
  const user = req.user as User;
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, "Contact not found");
  }
  let excludedKeys = ["createdAt", "updatedAt", "userId"];

  if(contact.userId !== user.id) excludedKeys.push("email")
  res.send(exclude(contact, excludedKeys as Array<keyof Contact> ));
});

export default {
  getContact,
};
