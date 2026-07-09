#!/usr/bin/env node
const ParseURL = require('./util/ParseURL');
const RepoCli = require('./RepoCli');
require("dotenv").config();

const initialise = async() =>{
  const url = ParseURL(process.argv[2]);
  const instance = new RepoCli(url);
  await instance.init();
}

initialise();