const { exec } = require("child_process");

const execAwsCommand = (awsCommand) => {
  return new Promise((resolve) => {
    exec(awsCommand, (error, stdout, stderr) => {
      if (error || stderr) {
        if (stderr) {
          console.log({ stderr });
        }
        resolve([]);
      }

      resolve(JSON.parse(stdout));
    });
  });
};

async function getAllPaths() {
  const awsCommand = `aws ssm describe-parameters --query "Parameters[*].{Name:Name}"`;
  const allPaths = await execAwsCommand(awsCommand);
  const results = allPaths.reduce((acc, act) => {
    const { Name } = act;
    const regex = /^\/.*\//gi;
    const path = Name.match(regex);
    if (!acc[path]) {
      acc[path] = 0;
    }
    acc[path] += 1;
    return acc;
  }, {});
  const paths = Object.keys(results)
    .map((key, index) => {
      return { path: key, value: results[key], id: index };
    })
    .sort(function (a, b) {
      if (a.path > b.path) {
        return 1;
      }
      if (a.path < b.path) {
        return -1;
      }

      return 0;
    });
  return paths;
}
async function getParametersByPath(paramsPath) {
  const awsCommand = `aws ssm get-parameters-by-path --path "${paramsPath}" --with-decryption --query "Parameters[*].{name:Name,value:Value,type:Type}"`;
  const parameters = await execAwsCommand(awsCommand);

  return parameters
    .map((item) => {
      const name = item.name.replace(paramsPath, "");
      return {
        ...item,
        name,
      };
    })
    .sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }

      return 0;
    });
}
async function main() {
  const ENVIRONMENT = "dev";
  const PARAM_PATH = `/integrator/backend/${ENVIRONMENT}/`;

  for (const parameter of parameters) {
    console.log(parameter);
    const ssmCommand = `aws ssm put-parameter --overwrite --name "${PARAM_PATH}${parameter.Name}" --value "${parameter.Value}" --type "${parameter.Type}"`;
    await execAwsCommand(ssmCommand);
  }
  const awsCommand = `aws ssm get-parameters-by-path --path "${PARAM_PATH}" --with-decryption --query "Parameters[*].{Name:Name,Value:Value,Type:Type}"`;
  console.log(await execAwsCommand(awsCommand));
}

module.exports = { getAllPaths, getParametersByPath };
