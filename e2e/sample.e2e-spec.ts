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

    it("open sidedrawer menu", async () => {
        const sideDrawerLocator = "android.support.v7.widget.LinearLayoutCompat";
        const sideDrawerBtn = (await driver.findElementByClassName(sideDrawerLocator));
        await sideDrawerBtn.click();
        const sideDrawer = (await driver.findElementByClassName(sideDrawerLocator));
        assert.isTrue(await sideDrawer.isDisplayed());

        const showSideDrawerResult = await driver.compareScreen("side-drawer-displayed", 5, 0.01);
        assert.isTrue(showSideDrawerResult);
    });
});