#!/usr/bin/env node

"use strict";

var argv = require('yargs').argv;
var ionicHandler = require(__dirname + '/src/core/ionicHandler');
var angularHandler = require(__dirname + '/src/core/angularHandler');
var helpText = require(__dirname + '/src/core/help');

if (argv.help) {
    console.log(helpText);
    return true;

}

let userInput = argv._[0].split(":");

let baseCommand = userInput[0];
let secondaryCommand = userInput[1];
let featureName = argv._[1];

switch (baseCommand) {
    case "make":
        switch (secondaryCommand) {
            case "page":
                if (argv.nav) {
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
        break;

    default:
        console.error("Command not found! Please try again.");
        break;
}