#!/usr/bin/env node

var argv = require('yargs').argv;
var filehandler = require('./src/core/filehandler');

let userInput = argv._[0].split(":");

let baseCommand = userInput[0];
let secondaryCommand = userInput[1];
let featureName = argv._[1];

if(baseCommand === "make"){
  switch(secondaryCommand){
    case "page":
    if(argv.navpage){
      filehandler.createPage(featureName, "./app/pages", "navpage");
      break;
    }
    filehandler.createPage(featureName, "./app/pages", "page");
    break;

    case "component":
    filehandler.createComponent(featureName, "./app/components");
    break;

    default:
    window.console.log("Command not found! Please try again.");
    break;
  }
}
