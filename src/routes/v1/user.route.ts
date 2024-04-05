import express from "express";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import { userValidation } from "../../validations";
import { userController } from "../../controllers";

const router = express.Router();

router
  .route("/:userId")
  .get(auth(), validate(userValidation.getUser), userController.getUser);

export default router;
