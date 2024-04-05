import express from "express";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import { searchValidation } from "../../validations";
import { searchController } from "../../controllers";

const router = express.Router();

router
  .route("/by-name")
  .post(auth(), validate(searchValidation.searchByName), searchController.searchByName);

export default router;
