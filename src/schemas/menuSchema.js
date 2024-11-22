import Joi from "joi";

const menuSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "Menu is required" }),
  description: Joi.string()
    .required()
    .messages({ "string.empty": "Description is required" }),
  price: Joi.number()
    .required()
    .messages({ "number.base": "Price must be a number" }),
  category: Joi.string()
    .valid("coffee", "non-coffee", "food")
    .required()
    .messages({
      "string.empty": "Category is required",
      "any.only": "Please select a valid category",
    }),
  image: Joi.alternatives().conditional("type", {
    is: "create",
    then: Joi.any()
      .required()
      .messages({ "any.required": "Image is required" }),
    otherwise: Joi.any().optional(),
  }),
  type: Joi.string().valid("create", "edit").required(),
});

export default menuSchema;
