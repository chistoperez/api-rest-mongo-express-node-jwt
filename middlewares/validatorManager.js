import axios from "axios";
import { validationResult, body, param } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const bodyRegisterValidator = [
  body("email", "Incorrect Email format").trim().isEmail().normalizeEmail(),
  body("password", "minimum 6 characters").trim().isLength({ min: 6 }),
  body("password", "Incorrect Password format").custom((value, { req }) => {
    if (value !== req.body.repassword) {
      throw new Error("Passwords do not match");
    }
    return value;
  }),
  validationResultExpress,
];

export const bodyLoginValidator = [
  body("email", "Incorrect Email format").trim().isEmail().normalizeEmail(),
  body("password", "minimum 6 characters").trim().isLength({ min: 6 }),
  validationResultExpress,
];

export const bodyLinkValidator = [
  body("longLink", "incorrect Link format")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        if (!value.startsWith("https://")) {
          value = "https://" + value;
        }
        await axios.get(value);
        return value;
      } catch (error) {
        throw new Error("longLink not found");
      }
    }),
  validationResultExpress,
];

export const paramLinkValidator = [
  param("id", "Formato no válido (expressValidator)")
    .trim()
    .notEmpty()
    .escape(),
  validationResultExpress,
];
