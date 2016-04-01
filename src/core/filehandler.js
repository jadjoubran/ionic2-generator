var fs = require('fs');
var fsExtra = require('fs-sync');
var _ = require("lodash");

module.exports = {
    createPage: (featureName, filePath, generatedType) => {
      var stubContent = '';

      stubContent = fs.readFileSync(`src/stubs/ionic/${generatedType}.ts.stub`, 'utf8');

      var generatedContent = stubContent.replace("{{StudlyName}}", _.capitalize(featureName));

      console.log(`Creating file in ${filePath}/`);

      fs.writeFile(`${filePath}/${featureName}.ts`, generatedContent, function(error) {
        console.log(error);
      });
    },

    createComponent: (featureName, filePath) => {
      if (fsExtra.exists(`${filePath}/${featureName}`)) {
          console.log("Directory already exists!");
          return false;
        }

        fs.mkdirSync(`${filePath}/${featureName}`, 0755);

        var stubContent = fs.readFileSync(`src/stubs/angular/component/component.ts.stub`, 'utf8');
        // var stubContentHTML = fs.readFileSync(`src/stubs/angular/component.html.stub`, 'utf8');
        // var stubContentSASS = fs.readFileSync(`src/stubs/angular/component.sass.stub`, 'utf8');

        var generatedContent = stubContent.replace("{{StudlyName}}", _.capitalize(featureName));

        var creatingPath = `${filePath}/${featureName}/${featureName}`;
        console.log(`Creating file in ${creatingPath}`);

        fs.writeFile(`${creatingPath}.ts`, generatedContent, function(error) {
          console.log(error);
        });

        fsExtra.copy('src/stubs/angular/component/component.sass.stub', `${creatingPath}.sass`);
        fsExtra.copy('src/stubs/angular/component/component.html.stub', `${creatingPath}.html`);
      }
    };
