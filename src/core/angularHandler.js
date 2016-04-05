var _ = require("lodash");
var fs = require('fs');
// var fsExtra = require('fs-sync');

var common = require(__dirname + '/common');

module.exports = {
    createComponent: (featureName, filePath) => {
        "use strict";

        if (!common.directoryExists(filePath)) {
            console.log("Please create it first.");
            return false;
        }

        let creatingPath = `${filePath}/${featureName}`;

        if (common.fileExists(creatingPath, featureName)) {
            return false;
        }

        if (!common.directoryExists(creatingPath)) {
            common.promptToCreateDir(featureName, creatingPath, '', component);
            return true;
        }

        component(featureName, creatingPath);
        return true;
    },
    createService: (featureName, filePath) => {
        "use strict";

        if (!common.directoryExists("./app")) {
            console.log("Please create it first.");
            return false;
        }


        if (common.fileExists(filePath, featureName)) {
            return false;
        }

        if (!common.directoryExists(filePath)) {
            common.promptToCreateDir(featureName, filePath, '', service);
            return true;
        }

        service(featureName, filePath);
        return true;
    }
};

function component(featureName, filePath) {
    "use strict";

    let stubContentTS = fs.readFileSync(`${__dirname}/../stubs/angular/component/component.ts.stub`, 'utf8');
    let stubContentHTML = fs.readFileSync(`${__dirname}/../stubs/angular/component/component.html.stub`, 'utf8');
    let stubContentSCSS = fs.readFileSync(`${__dirname}/../stubs/angular/component/component.scss.stub`, 'utf8');

    let generatedContentTS = stubContentTS.replace("{{StudlyName}}", _.capitalize(featureName));
    let generatedContentHTML = stubContentHTML.replace("{{StudlyName}}", _.capitalize(featureName));
    let generatedContentSCSS = stubContentSCSS.replace("{{StudlyName}}", _.capitalize(featureName));

    let fileCreatingPath = `${filePath}/${featureName}`;

    console.log(`Creating files in ${filePath}`);

    fs.writeFile(`${fileCreatingPath}.component.ts`, generatedContentTS, function(error) {
        if (error) {
            console.log(error);
        }
    });
    fs.writeFile(`${fileCreatingPath}.html`, generatedContentHTML, function(error) {
        if (error) {
            console.log(error);
        }
    });
    fs.writeFile(`${fileCreatingPath}.scss`, generatedContentSCSS, function(error) {
        if (error) {
            console.log(error);
        }
    });
}

function service(featureName, filePath) {
    "use strict";

    let stubContentTS = fs.readFileSync(`${__dirname}/../stubs/angular/service/service.ts.stub`, 'utf8');

    let generatedContentTS = stubContentTS.replace("{{StudlyName}}", _.capitalize(featureName));

    console.log(`Creating files in ${filePath}`);

    fs.writeFile(`${filePath}/${featureName}.service.ts`, generatedContentTS, function(error) {
        if (error) {
            console.log(error);
        }
    });
}