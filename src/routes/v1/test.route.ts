import express from 'express';
import httpStatus from 'http-status';

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.status(httpStatus.OK).send("v1 route");
  });

export default router;
