/*eslint-disable*/
//Have to do this because we need to require to use the api but the variable itself is not used
var should = require('chai').should(),
/*eslint-enable*/
    base = process.env.PWD,
    ionicHandler = require(`${base}/src/core/ionichandler`),
    angularHandler = require(`${base}/src/core/angularhandler`),
    fsExtra = require('fs-sync');

describe('Ionic page generation', function() {

    beforeEach(function() {
        fsExtra.mkdir(`${base}/app/pages/`);
        fsExtra.mkdir(`${base}/app/components/`);
    });

    it('should create the page_name files', function() {
        fsExtra.mkdir(`${base}/app/pages/login/`);

        ionicHandler.createPage('login', "./app/pages", "page");
        var folderCreated = fsExtra.exists(`${base}/app/pages/login/`);

        folderCreated.should.equal(true);
    });

    it('should create the component_name files', function() {
        fsExtra.mkdir(`${base}/app/components/login/`);

        angularHandler.createComponent('login', "./app/components");
        var folderCreated = fsExtra.exists(`${base}/app/components/login/`);

        folderCreated.should.equal(true);
    });

    it('should return false if the files already exist', function() {
        fsExtra.mkdir(`${base}/app/components/login/`);
        angularHandler.createComponent('login', "./app/components");

        var attemptWithExistingFiles = angularHandler.createComponent('login', "./app/components");

        attemptWithExistingFiles.should.equal(false);
    });

    afterEach(function() {
        fsExtra.remove(`${base}/app/`);
    });

});