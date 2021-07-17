const configSchema = require("./configSchema");

const { PORT, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION } =
  process.env;

const res = configSchema.validate({
  PORT,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_DEFAULT_REGION,
});

if (res.error) {
  throw res.error;
}

module.exports = res.value;
