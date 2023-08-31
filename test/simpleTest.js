const { describe } = require("mocha");
const { Builder, By, until, wait } = require("selenium-webdriver");
const should = require("chai").should();
const chrome = require("selenium-webdriver/chrome");
// const { execSync } = require("child_process");
// const waitOn = require('wait-on');
const {dockerRunner, stopDocker} =require('../utils/dockerRuner.js');



describe("api simple test ", () => {
    let driver
    let containerId
    const textLocator = By.id('test')
  

  beforeEach(async () => {

    containerId = await dockerRunner(containerId);

    const options = new chrome.Options();
    options.addArguments("--incognito");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

  });

  afterEach(async () => {

    if (driver) {
      await driver.quit();
    };

    stopDocker(containerId);

  });

  it("test, find word", async () => {
      
      await driver.get("http://localhost:5555/");
      await driver.wait(until.elementLocated(textLocator),3000);

      const findeText = await driver.findElement(textLocator).getText();
      findeText.should.to.equal('Its test time')
  });
});