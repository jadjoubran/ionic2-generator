var _ = require("lodash");
var fs = require('fs');
// var fsExtra = require('fs-sync');

var common = require(__dirname + '/common');

module.exports = {
    createPage: (featureName, filePath, generatedType) => {
        "use strict";

        if (!common.directoryExists(filePath)) {
            console.log("Please create it first.");
            return false;
        }

        let creatingPath = `${filePath}/${featureName}`;

        if(common.fileExists(creatingPath, featureName)){
            return false;
        }

        if (!common.directoryExists(creatingPath)) {
            common.promptToCreateDir(featureName, creatingPath, generatedType, page);
            return true;
        }

        page(featureName, creatingPath, generatedType);
        return true;
    }
};

function page(featureName, filePath, generatedType) {
    "use strict";

    let stubContentTS = fs.readFileSync(`${__dirname}/../stubs/ionic/page/${generatedType}.ts.stub`, 'utf8');
    let stubContentHTML = fs.readFileSync(`${__dirname}/../stubs/ionic/page/page.html.stub`, 'utf8');
    let stubContentSCSS = fs.readFileSync(`${__dirname}/../stubs/ionic/page/page.scss.stub`, 'utf8');

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