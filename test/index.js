/*eslint-disable*/
//Have to do this because we need to require to use the api but the variable itself is not used
var should = require('chai').should(),
    expect = require('chai').expect,
    /*eslint-enable*/
    base = process.env.PWD,
    ionicHandler = require(`${base}/src/core/ionichandler`),
    angularHandler = require(`${base}/src/core/angularhandler`),
    fsExtra = require('fs-sync');

describe('File generation', function() {

    beforeEach(function() {
        fsExtra.mkdir(`${base}/app/pages/`);
        fsExtra.mkdir(`${base}/app/components/`);
        fsExtra.mkdir(`${base}/app/services/`);
    });

    afterEach(function() {
        fsExtra.remove(`${base}/app/`);
    });

    it('should create the page_name files', function() {
        fsExtra.mkdir(`${base}/app/pages/login/`);

        ionicHandler.createPage('login', "./app/pages", "page");
        var folderCreated = fsExtra.exists(`${base}/app/pages/login/`);

        expect(folderCreated).to.be.true;
    });

    it('should create the component_name files', function() {
        fsExtra.mkdir(`${base}/app/components/login/`);

        angularHandler.createComponent('login', "./app/components");
        var folderCreated = fsExtra.exists(`${base}/app/components/login/`);

        expect(folderCreated).to.be.true;
    });

    it('should create the service_name file', function() {
        angularHandler.createService('login', "./app/services");
        console.log(fsExtra.exists(`${base}/app/services/login.service.ts`));
        var fileCreated = fsExtra.exists(`${base}/app/services/login.service.ts`);

        expect(fileCreated).to.be.true;
    });

    it('should return false if the files already exist', function() {
        fsExtra.mkdir(`${base}/app/components/login/`);
        angularHandler.createComponent('login', "./app/components");

        var attemptWithExistingFiles = angularHandler.createComponent('login', "./app/components");

        expect(attemptWithExistingFiles).to.be.false;
    });

});