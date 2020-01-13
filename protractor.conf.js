const {SpecReporter} = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 60000,
  suites: {
    first: 'e2e/test-cases/**.e2e-spec.ts',
  },
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--window-size=1300,1100']
    },
  },
  baseUrl: 'http://localhost:8080/',
  framework: 'jasmine',
  displayStacktrace: true,
  directConnect: true,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 61000,
    print: () => {}
  },
  params: {
    baseUrl: 'http://localhost:8080',
    E2E_TIMEOUT: 30000
  },
  onPrepare() {
    // Capture screenshoot on failure
    var fs1 = require('fs');
    if (!fs1.existsSync('./testresults')) {
      fs1.mkdirSync('./testresults');
    }
    jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: false}}));
    var fs = require('fs-extra');
    jasmine.getEnv().addReporter({
      specDone(result) {
        if (result.status == 'failed') {
          browser.getCapabilities().then( () => {

            browser.takeScreenshot().then( (png) => {
              var stream = fs.createWriteStream('testresults/' + '-' + result.fullName + '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });

    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  }
};
