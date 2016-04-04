/*eslint-disable*/
//Have to do this because we need to require to use the api but the variable itself is not used
var should = require('chai').should(),
/*eslint-enable*/
    base = process.env.PWD,
    ionicHandler = require(`${base}/src/core/ionichandler`),
    fsExtra = require('fs-sync');

describe('Ionic page generation', function() {

    beforeEach(function() {
        fsExtra.mkdir(`${base}/app/pages/`);
        fsExtra.mkdir(`${base}/app/components/`);
    });

    it('should create the page name file', function() {
        fsExtra.mkdir(`${base}/app/pages/login/`);

        ionicHandler.createPage('login', "./app/pages", "page");
        var folderCreated = fsExtra.exists(`${base}/app/pages/login/`);

        folderCreated.should.equal(true);
    });


    afterEach(function() {
        fsExtra.remove(`${base}/app/`);
    });

});