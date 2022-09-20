#!/usr/bin/env node
import { execSync } from 'child_process';
import chalk from 'chalk';
import path from 'path';
import { program } from 'commander';

const log = console.log;
const blue = chalk.blue;
const red = chalk.red;
const green = chalk.green;

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to execute command ${command}`, e);
    return false;
  }
  return true;
};

program.version('1.1.0');

program.option(
  '-f, --font <type>',
  'specify the font that you want to install from the given fonts',
  'Poppins'
);

program.option(
  '-t, --type <type>',
  'specify whether you want modular js boilerplate code or not',
  'basic'
);

program.parse(process.argv);
const options = program.opts();
console.log('options :', options);

const dirName = process.argv[2];

if (dirName === undefined) {
  log(red('You have not specified the project name.'));
  process.exit(-1);
}

const root = path.resolve(dirName);

log(blue(`Creating a javascript app in ${green(root)}`));
log(process.argv);
log(process.platform);

const gitCheckout = `git clone --dept 1 https://github.com/akshayraichur/js-app-template.git ${dirName}`;

console.log(`Cloning the repo with name ${dirName}`);

const checkedOut = runCommand(gitCheckout);
if (!checkedOut) process.exit(-1);

const moveToAppDir = runCommand(`cd ${dirName}`);
if (!moveToAppDir) process.exit(-1);

// remove git history
const removeGitCommand = `rm -rf .git`;
const removeGit = runCommand(removeGitCommand);

if (!removeGit)
  console.log(
    red(
      'we could not remove git from this repo to re-initialize, please do it manually'
    )
  );

// Initialize git
const gitInitialize = `git init`;
const checkGitInitialization = runCommand(gitInitialize);

if (!checkGitInitialization)
  console.log(red('we could not initialize git, please do it manually'));
else {
  console.log(green('git iitialized'));
}

// change branch name to main
const changeBranchName = `git branch -m main`;
const checkChangeBranch = runCommand(changeBranchName);
if (!checkChangeBranch)
  console.log(
    red(
      'we could not change git branch to main from master, please do it manually'
    )
  );
else {
  console.log(green('git branch changed from master to main'));
}

console.log(
  `Congratulations! You are ready. Follow the commands to start the project. `
);
console.log(`cd ${dirName} && npm start`); // TODO: subject to change
