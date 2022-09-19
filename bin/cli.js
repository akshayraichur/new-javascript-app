#!/usr/bin/env node
const { execSync } = require('child_process');

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to execute command ${command}`, e);
    return false;
  }
  return true;
};

const dirName = process.argv[2];
const gitCheckout = `git clone --dept 1 https://github.com/akshayraichur/js-app-template.git ${dirName}`;

console.log(`Cloning the repo with name ${dirName}`);

const checkedOut = runCommand(gitCheckout);
if (!checkedOut) process.exit(-1);

console.log(
  `Congratulations! You are ready. Follow the commands to start the project. `
);
console.log(`cd ${dirName} && npm start`); // TODO: subject to change
