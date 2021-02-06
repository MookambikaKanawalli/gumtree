import chai = require('chai');
import chaiAsPromised = require("chai-as-promised");
import { StepDefinitions, TableDefinition } from 'cucumber';
import { HomePage } from "../pages/gumtree.page";
import { browser, protractor } from 'protractor';
import * as expectedMessages from "./../../config/expected-messages.json";
import * as testData from "./../../config/credentials-config.json";

const EC = protractor.ExpectedConditions;
chai.use(chaiAsPromised as any);
const expect = chai.expect;

export = function (this: StepDefinitions) {

    const gumtreePage: HomePage = new HomePage();

    // Used below step definition to automate login process
    this.Given(/^.*? logs in as a buyer$/, async () => {
        await browser.wait(EC.visibilityOf(gumtreePage.signInPageTitle), 20000);
        await expect(await gumtreePage.signInPageTitle.getText()).to.eql(expectedMessages.signInPageTitle);
        await browser.wait(EC.visibilityOf(gumtreePage.emailAddressInput), 20000);
        await gumtreePage.typeIntoEmailAddress(testData.uid);
        await browser.wait(EC.visibilityOf(gumtreePage.passwordInput), 20000);
        await gumtreePage.typeIntoEmailAddress(testData.pwd);
        await browser.wait(EC.visibilityOf(gumtreePage.signInButton), 20000);
        await browser.wait(EC.elementToBeClickable(gumtreePage.signInButton), 20000);
        await gumtreePage.login();
        await browser.wait(EC.visibilityOf(gumtreePage.loggedInUserName), 20000);
    });

    this.Given(/^.*? is on gumtree "(.*)" page$/, async (advertisementId:string) => {
        let url:string;
        let actualAdID:any;
        await gumtreePage.openAdPage(advertisementId);
        url = await browser.getCurrentUrl();
        actualAdID = url.split('/');
        await expect(parseInt(actualAdID[(actualAdID.length)-1])).to.eql(parseInt(advertisementId));
    });

    this.Then(/^.*? sends the message "(.*)" to the seller of the ad$/, async (message:string) => {
        await gumtreePage.typeInQueryMessage(message);
    });

    this.Then(/^.*? navigates to next page$/, async () => {
        await gumtreePage.sliderIcon.click();
        await browser.wait(EC.visibilityOf(gumtreePage.liveAdsTtile), 25000);
        await browser.wait(EC.visibilityOf(gumtreePage.recentlySoldTitle), 25000);
    });
};