var fs = require('fs');
var fsExtra = require('fs-sync');
var _ = require("lodash");

module.exports = {
  createPage: (featureName, filePath, generatedType) => {
    var stubContent = '';

    stubContent = fs.readFileSync(`src/stubs/ionic/${generatedType}.ts.stub`, 'utf8');

    var generatedContent = stubContent.replace("{{StudlyName}}", _.capitalize(featureName));

    window.console.log(`Creating file in ${filePath}/`);

    fs.writeFile(`${filePath}/${featureName}.ts`, generatedContent, function(error) {
      window.console.log(error);
    });
  },

  createComponent: (featureName, filePath) => {
    if (!fsExtra.exists(`${filePath}`)) {
      window.console.log("Directory doesnt' exist!", filePath);
      return false;
    }

    if (fsExtra.exists(`${filePath}/${featureName}`)) {
      window.console.log("Directory already exists!", `${filePath}/${featureName}`);
      return false;
    }

    fs.mkdirSync(`${filePath}/${featureName}`, 755);

    let stubContent = fs.readFileSync(`src/stubs/angular/component/component.ts.stub`, 'utf8');
    // let stubContentHTML = fs.readFileSync(`src/stubs/angular/component.html.stub`, 'utf8');
    // let stubContentSASS = fs.readFileSync(`src/stubs/angular/component.sass.stub`, 'utf8');

    let generatedContent = stubContent.replace("{{StudlyName}}", _.capitalize(featureName));

    let creatingPath = `${filePath}/${featureName}/${featureName}`;
    window.console.log(`Creating file in ${creatingPath}`);

    fs.writeFile(`${creatingPath}.ts`, generatedContent, function(error) {
      window.console.log(error);
    });

    fsExtra.copy('src/stubs/angular/component/component.sass.stub', `${creatingPath}.sass`);
    fsExtra.copy('src/stubs/angular/component/component.html.stub', `${creatingPath}.html`);
  }
};
