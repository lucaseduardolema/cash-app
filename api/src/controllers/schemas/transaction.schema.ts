import Joi from "joi";

export const transactionSchema = Joi.object({
  username: Joi.string().min(3).required(),
  value: Joi.number().positive().precision(2).required()
})
