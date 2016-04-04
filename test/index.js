var should = require('chai').should(),
    ionicHandler = require(__dirname + '/../src/core/ionicHandler'),
    //     angularHandler = require('./src/core/angularHandler');

    fsExtra = require('fs-sync');

describe('Ionic page generation', function() {

    beforeEach(function() {
        fsExtra.mkdir(`${__dirname}/../app/pages/`);
        fsExtra.mkdir(`${__dirname}/../app/components/`);
    });

    it('should create the page name file', function() {
        fsExtra.mkdir(`${__dirname}/../app/pages/login/`);

        ionicHandler.createPage('login', "./app/pages", "page");
        var folderCreated = fsExtra.exists(`${__dirname}/../app/pages/login/`);

        folderCreated.should.equal(true);
    });


    afterEach(function() {
        fsExtra.remove(`${__dirname}/../app/`);
    });

});