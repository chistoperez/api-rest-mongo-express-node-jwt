import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/ValidationResultExpress.js";

const router = Router();

router.post(
  "/register",
  [
    body("email", "Incorrect Email format").trim().isEmail().normalizeEmail(),
    body("password", "minimum 6 characters").trim().isLength({ min: 6 }),
    body("password", "Incorrect Password format").custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("Passwords do not match");
      }
      return value;
    }),
  ],
  validationResultExpress,
  register
);
router.post(
  "/login",
  [
    body("email", "Incorrect Email format").trim().isEmail().normalizeEmail(),
    body("password", "minimum 6 characters").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

export default router;
