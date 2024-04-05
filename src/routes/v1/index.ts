import express from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import searchRoute from "./search.route";
import spamRoute from "./spam.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/search",
    route: searchRoute,
  },
  {
    path: "/spam",
    route: spamRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
