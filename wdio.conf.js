const path = require('path');
const apkPath = path.resolve(__dirname, 'App');
exports.config = {
    specs: [
        ""
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [{
        platformName: 'Android',
        deviceName: 'realme RMX3231',
        app: apkPath,
        automationName: 'UiAutomator2',
        appPackage: "",
        appActivity: ""
    }],
    logLevel: 'info',
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    baseUrl: 'http://localhost',
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    // Default request retries count
    connectionRetryCount: 3,
    services: ['appium'],
    port: 4723,
    path: '/wd/hub',
    framework: 'mocha',
    // reporters: ['spec'],
    reporters: ['spec', ['light',{
        outputDir: './Results',
        outputFile:"demo",    // html report file will be name this 
        addScreenshots: false,   // to add screenshots in report make it as true. Default is false
        //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
    }]

  ],
  
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000000
    },

    onComplete: function (exitCode, config, capabilities, results) {
        const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
        mergeResults("./Results");
     },
        
} 