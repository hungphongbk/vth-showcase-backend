#!/usr/bin/env node
// noinspection NpmUsedModulesInstalled
const yargs = require("yargs/yargs");
// noinspection NpmUsedModulesInstalled
const { hideBin } = require("yargs/helpers");
const { exec } = require("child_process"),
  { promisify } = require("util");
const argv = yargs(hideBin(process.argv)).argv;

const execPromise = promisify(exec);

const deployments = argv.d.split(","),
  namespace = argv.n;

async function rollout(d) {
  console.log(`Restart deployment ${d}/${namespace}...`);
  await execPromise(`kubectl rollout restart deployment ${d} -n ${namespace}`);
  await execPromise(`kubectl rollout status deployment ${d} -n ${namespace}`);
}

Promise.all(deployments.map(rollout));
