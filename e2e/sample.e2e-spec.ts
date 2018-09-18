import { AppiumDriver, createDriver, SearchOptions } from "nativescript-dev-appium";
import { assert } from "chai";

describe("sample scenario", () => {
    const defaultWaitTime = 5000;
    let driver: AppiumDriver;

    before(async () => {
        driver = await createDriver();
    });

    after(async () => {
        await driver.quit();
        console.log("Quit driver!");
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await driver.logTestArtifacts(this.currentTest.title);
        }
    });

    it("no pass login", async () => {
        const allowCameraBtn = (await driver.findElementByTextIfExists("Allow"))
        if (allowCameraBtn) {
            await allowCameraBtn.click();
        }
        await (await driver.findElementByText("No Pass Login", SearchOptions.contains)).click();

        const astronomicalDayElement = await driver.findElementByText("Astronomical", SearchOptions.contains);

        assert.isTrue(astronomicalDayElement != null && (await astronomicalDayElement.isDisplayed()));
    });

    const sideDrawerBtn = () => {
        const sideDrawerLocator = "android.support.v7.widget.LinearLayoutCompat";
        return driver.findElementByClassName(sideDrawerLocator);
    }

    it("open sidedrawer menu", async () => {
        await (await sideDrawerBtn()).click();
        const showSideDrawerResult = await driver.compareScreen("side-drawer-displayed", 5, 0.01);
        assert.isTrue(showSideDrawerResult);
    });

    it("close sidedrawer menu", async () => {
        await (await sideDrawerBtn()).click();
        const showSideDrawerResult = await driver.compareScreen("side-drawer-closed", 5, 0.01);
        assert.isTrue(showSideDrawerResult);
    });

    it("navigate to photo of the day and back", async () => {
        await (await sideDrawerBtn()).click();
        await (await driver.findElementByText("Photo of the day", SearchOptions.contains)).click();
        const buttons = await driver.findElementsByClassName(driver.locators.button);

        assert.isTrue(buttons.length >= 5);

        await driver.navBack();

        const showSideDrawerResult = await driver.compareScreen("side-drawer-closed", 5, 0.01);
        assert.isTrue(showSideDrawerResult);
    });
});