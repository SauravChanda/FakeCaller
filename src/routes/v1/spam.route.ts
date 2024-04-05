import express from "express";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import { spamValidation } from "../../validations";
import { spamController } from "../../controllers";

const router = express.Router();

router
  .route("/mark-spam")
  .post(auth(), validate(spamValidation.markSpam), spamController.markSpam);

router
  .route("/remove-spam")
  .post(auth(), validate(spamValidation.unmarkSpam), spamController.unmarkSpam);

export default router;
