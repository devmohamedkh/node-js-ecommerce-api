const joi = require("joi");

function registerValidation(data) {
  const schema = joi.object({
    firstName: joi.string().min(4).required(),
    lastName: joi.string().min(4).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    phone: joi.string().min(10).max(10),
  });
  return schema.validate(data);
}

function loginValidation(data) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });
  return schema.validate(data);
}

function addProductValidation(data) {
  const schema = joi.object({
    name: joi.string().min(4).required(),
    productCode: joi.string().min(1).required(),
    description: joi.string().min(6).required(),
    price: joi.number().min(1).required(),
    productImages: joi.string().required(),
    quantity: joi.number().min(0).required(),
  });
  return schema.validate(data);
}
function addCatigoryValidation(data) {
  const schema = joi.object({
    name: joi.string().min(4).required(),
  });
  return schema.validate(data);
}

module.exports = {
  registerValidation,
  loginValidation,
  addProductValidation,
  addCatigoryValidation,
};
