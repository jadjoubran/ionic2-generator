#!/usr/bin/env node
"use strict";

var argv = require('yargs').argv;
var ionicHandler = require('./src/core/ionicHandler');
var angularHandler = require('./src/core/angularHandler');

let userInput = argv._[0].split(":");

let baseCommand = userInput[0];
let secondaryCommand = userInput[1];
let featureName = argv._[1];

if(baseCommand === "make"){
  switch(secondaryCommand){
    case "page":
    if(argv.navpage){
      ionicHandler.createPage(featureName, "./app/pages", "navpage");
      break;
    }
    ionicHandler.createPage(featureName, "./app/pages", "page");
    break;

    case "component":
    angularHandler.createComponent(featureName, "./app/components");
    break;

    default:
    console.error("Command not found! Please try again.");
    break;
  }
}
