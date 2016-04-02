var _ = require("lodash");
var fs = require('fs');
// var fsExtra = require('fs-sync');

var common = require('./common');

module.exports = {
    createPage: (featureName, filePath, generatedType) => {
        "use strict";

        if (!common.directoryExists(filePath)) {
            console.log("Please create it first.");
            return false;
        }

        let creatingPath = `${filePath}/${featureName}`;

        if (!common.directoryExists(filePath)) {
            common.promptToCreateDir(featureName, creatingPath, generatedType, page);
            return true;
        }

        page(featureName, creatingPath, generatedType);
    }
};

function page(featureName, filePath, generatedType) {
    "use strict";

    let stubContentTS = fs.readFileSync(`src/stubs/ionic/page/${generatedType}.ts.stub`, 'utf8');
    let stubContentHTML = fs.readFileSync(`src/stubs/ionic/page/page.html.stub`, 'utf8');
    let stubContentSCSS = fs.readFileSync(`src/stubs/ionic/page/page.scss.stub`, 'utf8');

    let generatedContentTS = stubContentTS.replace("{{StudlyName}}", _.capitalize(featureName));
    let generatedContentHTML = stubContentHTML.replace("{{StudlyName}}", _.capitalize(featureName));
    let generatedContentSCSS = stubContentSCSS.replace("{{StudlyName}}", _.capitalize(featureName));

    let fileCreatingPath = `${filePath}/${featureName}`;

    console.log(`Creating files in ${filePath}`);

    fs.writeFile(`${fileCreatingPath}.ts`, generatedContentTS, function(error) {
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