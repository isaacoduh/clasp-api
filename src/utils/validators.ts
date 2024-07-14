import joi from "joi";

const registerSchema = joi.object({
  username: joi.string().min(4).max(20).alphanum().required(),
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(8).required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

export { registerSchema, loginSchema };
