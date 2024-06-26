#! /usr/bin/env node

const yargs = require("yargs");
const { execSync } = require("child_process");

const {
  _: [name],
  path,
} = yargs.argv;

// construct the migration path
const migrationPath = `src/database/migrations/${name}`;

execSync(`typeorm migration:create ${migrationPath}`, { stdio: "inherit" });
