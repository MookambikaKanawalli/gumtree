const { BeforeAll, After, AfterAll, Status } = require("cucumber");
import { Hooks } from "cucumber";
import { browser } from "protractor";
import { config } from "../../protractor.config";

export = function (this: Hooks) {
  this.setDefaultTimeout(60000);

  this.After(async (_) => {
    console.log("-------------After test--------------");
    browser.driver.close();
  });

  this.Before(async (_) => {
    console.log("-------------Before test--------------");
  });
};