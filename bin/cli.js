#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';
import chalk from 'chalk';

// chalk colours initialization
const log = console.log;
const blue = chalk.blue;
const red = chalk.red;
const green = chalk.green;

// check for platform, to change the commands in COMMANDS_TO_RUN obj
let platform = 'unix';
if (process.platform === 'win32') {
  platform = 'Windows';
}

// Function which executes the command
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
if (dirName === undefined) {
  log(red('You have not specified the project name.'));
  process.exit(-1);
}

const root = path.resolve(dirName);

log(blue(`Creating a javascript app in ${green(root)}`));
log();

const COMMANDS_TO_RUN = {
  CLONE: `git clone --dept 1 https://github.com/akshayraichur/js-app-template.git ${dirName}`,
  MOVE: `cd ${dirName}`,
  REMOVE_GIT: `cd ${dirName} && npx rimraf ./.git`,
  INITIALIZE_GIT: `cd ${dirName} && git init`,
  BRANCH_CHANGE: `cd ${dirName} && git branch -m main`,
};

console.log(`Cloning the repo with name ${dirName}`);
log();

const checkedOut = runCommand(COMMANDS_TO_RUN.CLONE);
if (!checkedOut) process.exit(-1);

const moveToDir = runCommand(COMMANDS_TO_RUN.MOVE);
if (!moveToDir) process.exit(-1);

// remove git from cloned repo
const removeGit = runCommand(COMMANDS_TO_RUN.REMOVE_GIT);
if (!removeGit) {
  log(
    red(
      'we could not remove git from this repo to re-initialize, please do it manually'
    )
  );
} else {
  log(green('Uninitialized git from project.'));
  log();
}

// Initialize new git repo
const checkGitInitialization = runCommand(COMMANDS_TO_RUN.INITIALIZE_GIT);
if (!checkGitInitialization)
  log(red('we could not initialize git, please do it manually'));
else {
  log(green('git initialized'));
}

// change branch name to main
const checkChangeBranch = runCommand(COMMANDS_TO_RUN.BRANCH_CHANGE);
if (!checkChangeBranch)
  log(
    red(
      'we could not change git branch to main from master, please do it manually'
    )
  );
else {
  log(green('git branch changed from master to main'));
}

log();
log(
  `Congratulations! You are ready. Follow the commands to start the project. `
);
log(`cd ${dirName} && npm start`); // TODO: subject to change
