var fs = require('fs');
// var fsExtra = require('fs-sync');
var _ = require("lodash");
var prompt = require('prompt');

var common = require('./common');

module.exports = {
    createPage: (featureName, filePath, generatedType) => {
        "use strict";

        common.checkFileExists(filePath, featureName);

        if (!common.checkPageDirectoryExists(filePath, featureName)) {
            promptToCreateDir(featureName, filePath, generatedType, page);
            return true;
        }

        page(featureName, filePath, generatedType);

    }
};


function promptToCreateDir(featureName, filePath, generatedType, callback) {
    prompt.start();

    prompt.message = "Would you like to create it? (Y/N)\n";
    prompt.delimiter = "";

    prompt.get([{
        name: 'answer',
        description: '',
        delimiter: ''
    }], function(err, result) {
        //
        // Log the results.
        //
        if (_.lowerCase(result.answer) === 'n') {
            console.log('Exiting...');
            process.exit(1);
        }

        console.log('Creating directory...');
        fs.mkdir(`${filePath}/`, () => {
            callback(featureName, filePath, generatedType);
        });
    });
}

function page(featureName, filePath, generatedType) {
    var stubContent = fs.readFileSync(`src/stubs/ionic/${generatedType}.ts.stub`, 'utf8');

    var generatedContent = stubContent.replace("{{StudlyName}}", _.capitalize(featureName));

    console.log(`Creating file in ${filePath}/`);

    fs.writeFile(`${filePath}/${featureName}.ts`, generatedContent, function(error) {
        console.log(error);
    });
}