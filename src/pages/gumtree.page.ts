import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");
import { browser, by, ElementFinder, Key, protractor } from "protractor";
import configJson from "../../config/credentials-config.json";

const EC = protractor.ExpectedConditions;
chai.use(chaiAsPromised as any);
const expect = chai.expect;

export class HomePage {
  public gumtreeLogo: ElementFinder;
  public signInPageTitle: ElementFinder;
  public emailAddressInput: ElementFinder;
  public passwordInput: ElementFinder;
  public signInButton: ElementFinder;
  public loggedInUserName: ElementFinder;
  public messageInput: ElementFinder;
  public consentMessage: ElementFinder;
  public sendMessageButton: ElementFinder;
  public sliderIcon: ElementFinder;
  public adTitle: ElementFinder;
  public liveAdsTtile: ElementFinder;
  public recentlySoldTitle: ElementFinder;
  public successSentMessageIcon: ElementFinder;
  public successSentMessage: ElementFinder;
  public closeSuccessMessageIcon: ElementFinder;

  constructor() {
    this.gumtreeLogo = browser.element(by.css(".svg.svg-logo.header__logo-svg"));
    this.signInPageTitle = browser.element(by.css(".sign-in-and-register-form__title"));
    this.emailAddressInput = browser.element(by.css("#input-gumtree-sign-in-email-field"));
    this.passwordInput = browser.element(by.css("#input-gumtree-sign-in-password-field"));
    this.signInButton = browser.element(by.partialButtonText("Sign In"));
    this.loggedInUserName = browser.element(by.css(".header__my-gumtree-trigger-text"));
    this.messageInput = browser.element(by.css("#input-reply-widget-form-message"));
    this.consentMessage = browser.element(by.css(".checkbox__label-text"));
    this.sendMessageButton = browser.element(by.css("#contact-seller-button"));
    this.sliderIcon = browser.element(by.css(".seller-profile__arrow .icon-slider-arrow"));
    this.adTitle = browser.element(by.css(".ad-listing__title"));
    this.liveAdsTtile = browser.element(by.css(".ad-listing-container:nth-of-type(1) div:nth-of-type(1) h3"));
    this.recentlySoldTitle = browser.element(by.css(".ad-listing-container:nth-of-type(2) div:nth-of-type(1) h3"));
    this.successSentMessageIcon = browser.element(by.css(".reply-widget-success-modal__success-icon"));
    this.successSentMessage = browser.element(by.css(".reply-widget-success-modal__title"));
    this.closeSuccessMessageIcon = browser.element(by.css(".icon-close"));
  }

  public async openHomePage() {
    await browser.get("/");
  }

  public async login() {
    await this.signInButton.click();
  }

  public async openAdPage(adId: string) {
    await browser.get("/s-ad/" + adId);
  }

  public async typeInQueryMessage(message: string) {
    await browser.wait(EC.visibilityOf(this.messageInput), 10000);
    await this.messageInput.click();
    await browser.sleep(500);
    await this.messageInput.clear();
    await browser.sleep(4000);
    await this.messageInput.sendKeys(message, Key.chord(Key.COMMAND, "a"), message);
    await browser.sleep(4000);
  }

  public async sendMessage() {
    await browser.wait(EC.visibilityOf(this.sendMessageButton), 10000);
    await this.sendMessageButton.click();
  }

  public async typeIntoEmailAddress(email: string) {
    await this.emailAddressInput.click();
    await this.emailAddressInput.clear();
    await this.emailAddressInput.sendKeys(email);
  }

  public async typeIntoPassword(password: string) {
    await this.passwordInput.click();
    await this.passwordInput.clear();
    await this.passwordInput.sendKeys(password);
  }
}
