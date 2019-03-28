import * as path from "path";
import { browser, Config } from "protractor";
import { Reporter } from "../support/reporter";
const jsonReports = process.cwd() + "/reports/json";

export const config: Config = {

    
    //seleniumAddress: "http://127.0.0.1:4444/wd/hub",

    SELENIUM_PROMISE_MANAGER: false,

    baseUrl: "https://www.google.com",

    capabilities: {
	//browserName: "firefox",
	//firefoxOptions: {
	//	args: ['--headless']
	//},
	//'moz:firefoxOptions':{
	//	args: ['--headless']
	//}
	browserName: "chrome",
        chromeOptions:{
            //binary: "/home/deloitte/Downloads/chrome-linux",
            args:["--headless", "--no-sandbox", "--disable-gpu"],// "--disable-dev-shm-usage", "--remote-debugging-port=4444"],
	    //detach: true
        }
    },
    //seleniumServerJar: "/var/jenkins_home/workspace/PipeLine Hello World/node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.141.59.jar",
    
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs: [
        "../../features/*.feature",
    ],

    onPrepare: () => {
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
        Reporter.createDirectory(jsonReports);
    },

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: "json:./reports/json/cucumber_report.json",
        require: ["../../typeScript/stepdefinitions/*.js", "../../typeScript/support/*.js"],
        strict: true,
        tags: "@CucumberScenario", //, or @ProtractorScenario or @TypeScriptScenario or @OutlineScenario",
    },

    onComplete: () => {
        Reporter.createHTMLReport();
    },
};
