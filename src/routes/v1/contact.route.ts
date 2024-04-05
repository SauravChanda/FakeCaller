import express from "express";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import { contactValidation } from "../../validations";
import { contactController } from "../../controllers";

const router = express.Router();

router
  .route("/:contactId")
  .get(auth(), validate(contactValidation.getContact), contactController.getContact);

export default router;
