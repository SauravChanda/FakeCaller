import express from "express";
import helmet from "helmet";
import cors from "cors";
import config from "./config/config";
import xss from "./middlewares/xss";
import { errorConverter, errorHandler } from "./middlewares/error";
import ApiError from "./utils/ApiError";
import httpStatus from "http-status";
import routes from "./routes/v1";
import { jwtStrategy } from './config/passport';
import passport from 'passport';

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// app.use("/", (req, res) => {
//   res.status(httpStatus.OK).send("Pong!!");
// });

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
