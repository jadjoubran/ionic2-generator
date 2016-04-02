var fs = require('fs');
var fsExtra = require('fs-sync');
var _ = require("lodash");

"use strict";

module.exports = {
  createPage: (featureName, filePath, generatedType) => {
    "use strict";

    var stubContent = '';

    stubContent = fs.readFileSync(`src/stubs/ionic/${generatedType}.ts.stub`, 'utf8');

    var generatedContent = stubContent.replace("{{StudlyName}}", _.capitalize(featureName));

    console.log(`Creating file in ${filePath}/`);

    fs.writeFile(`${filePath}/${featureName}.ts`, generatedContent, function(error) {
      console.log(error);
    });
  },

  createComponent: (featureName, filePath) => {
    "use strict";

    if (!fsExtra.exists(`${filePath}`)) {
      console.log("Directory doesnt' exist!", filePath);
      return false;
    }

    if (fsExtra.exists(`${filePath}/${featureName}`)) {
      console.log("Directory already exists!", `${filePath}/${featureName}`);
      return false;
    }

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
