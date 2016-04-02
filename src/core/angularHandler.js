var fs = require('fs');
var fsExtra = require('fs-sync');
var _ = require("lodash");

var common = require('./common');

module.exports = {
  createComponent: (featureName, filePath) => {
    "use strict";

    common.checkDirectoryExists(filePath, featureName);

    fs.mkdirSync(`${filePath}/${featureName}`, 755);

    let stubContent = fs.readFileSync(`src/stubs/angular/component/component.ts.stub`, 'utf8');
    // let stubContentHTML = fs.readFileSync(`src/stubs/angular/component.html.stub`, 'utf8');
    // let stubContentSASS = fs.readFileSync(`src/stubs/angular/component.sass.stub`, 'utf8');

    let generatedContent = stubContent.replace("{{StudlyName}}", _.capitalize(featureName));

    let creatingPath = `${filePath}/${featureName}/${featureName}`;
    console.log(`Creating file in ${creatingPath}`);

    fs.writeFile(`${creatingPath}.ts`, generatedContent, function(error) {
      console.log(error);
    });

    fsExtra.copy('src/stubs/angular/component/component.sass.stub', `${creatingPath}.sass`);
    fsExtra.copy('src/stubs/angular/component/component.html.stub', `${creatingPath}.html`);
  }
};