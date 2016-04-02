var fsExtra = require('fs-sync');

module.exports = {
    checkComponentDirectoryExists: (filePath, featureName) => {
        "use strict";

        if (fsExtra.exists(`${filePath}/${featureName}`)) {
            console.log("Directory already exists!", `${filePath}/${featureName}`);
            process.exit(1);
        }
    },
    checkPageDirectoryExists: (filePath) => {
        "use strict";

        if (!fsExtra.exists(`${filePath}`)) {
            console.log("Directory doesn't exist!", filePath);
            return false;
        }
    },
    checkFileExists: (filePath, featureName) => {
        "use strict";

        if (fsExtra.exists(`${filePath}/${featureName}.ts`)) {
            console.log("File already exists!", `${filePath}/${featureName}.ts`);
            process.exit(1);
        }
    }
};