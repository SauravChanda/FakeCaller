import express from "express";
import healthCheckRoute from "./test.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/",
    route: healthCheckRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
