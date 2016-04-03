var fs = require('fs');
var fsExtra = require('fs-sync');
var _ = require("lodash");
var prompt = require('prompt');

module.exports = {
    directoryExists: (filePath) => {
        "use strict";

        if (!fsExtra.exists(`${filePath}`)) {
            console.log("Directory doesn't exist!", filePath);
            return false;
        }

        return true;
    },
    checkFileExists: (filePath, featureName) => {
        "use strict";

        if (fsExtra.exists(`${filePath}/${featureName}.ts`)) {
            console.log("File already exists!", `${filePath}/${featureName}.ts`);
            process.exit(1);
        }

        return true;
    },
    promptToCreateDir: (featureName, filePath, generatedType, callback) => {
        "use strict";

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

};