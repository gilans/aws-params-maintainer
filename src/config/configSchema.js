const joi = require("joi");

module.exports = joi.object({
  PORT: joi.number().required(),
  AWS_ACCESS_KEY_ID: joi.string().required(),
  AWS_SECRET_ACCESS_KEY: joi.string().required(),
  AWS_DEFAULT_REGION: joi.string().required(),
});
