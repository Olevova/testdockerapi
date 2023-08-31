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
    containerId = await dockerRunner(containerId)
    // execSync('docker pull olevova1983/testapi:latest'); 
    // containerId  = execSync('docker run -d -p 5555:5555 olevova1983/testapi:latest');
    // console.log(containerId);
    const options = new chrome.Options();
    options.addArguments("--incognito");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    
      // await waitOn({ resources: ['http://localhost:5555'] });

  });
  afterEach(async () => {
    if (driver) {
      await driver.quit();
    };
    stopDocker(containerId)

    // execSync(`docker stop ${containerId}`);
    // execSync(`docker rm ${containerId}`);

  });

  it("test, find word", async () => {
      await driver.get("http://localhost:5555/");
      await driver.wait(until.elementLocated(textLocator),3000);

      const findeText = await driver.findElement(textLocator).getText();
      console.log(findeText);
      await driver.sleep(3000);
      findeText.should.to.equal('Its test time')
  });
});