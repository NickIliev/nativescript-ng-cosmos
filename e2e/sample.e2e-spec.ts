import { AppiumDriver, createDriver, SearchOptions } from "nativescript-dev-appium";
import { assert } from "chai";
import { wait } from "nativescript-dev-appium/lib/utils";

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

    const openSidedrawer = async () => {
        if (driver.isAndroid) {
            const sideDrawerLocator = "android.support.v7.widget.LinearLayoutCompat";
            const btn = await driver.findElementByClassName(sideDrawerLocator);
            await btn.click();
        } else {
            try {
                driver.touchAction
                    .press({ x: 8, y: 80 })
                    .wait(250)
                    .moveTo({ x: 320, y: 80 })
                    .wait(250)
                    .release()
                    .perform();
            } catch (error) {
                console.log("", error);
            }

        }
    }

    const closeSidedrawer = async () => {
        if (driver.isAndroid) {
            const sideDrawerLocator = "android.support.v7.widget.LinearLayoutCompat";
            const btn = await driver.findElementByClassName(sideDrawerLocator);
            await btn.click();
        } else {
            try {
                driver.touchAction
                    .press({ x: 320, y: 80 })
                    .release()
                    .perform();
            } catch (error) {
                console.log("", error);
            }

        }
    }

    it("open sidedrawer menu", async () => {
        await openSidedrawer();
        const showSideDrawerResult = await driver.compareScreen("side-drawer-displayed", 5, 0.01);
        assert.isTrue(showSideDrawerResult);
    });

    it("close sidedrawer menu", async () => {
        await closeSidedrawer();
        const showSideDrawerResult = await driver.compareScreen("side-drawer-closed", 5, 0.01);
        assert.isTrue(showSideDrawerResult);
    });

    it("navigate to photo of the day and back", async () => {
        await openSidedrawer();
        await driver.sleep(5000);

        const navToPhotoOfTheDay = async () => {
            if (driver.isAndroid) {
                (await driver.findElementByText("Photo of the day")).click();
            } else {
                await driver.touchAction
                    .tap({ x: 129, y: 140 })
                    .perform();
            }
        }
        await navToPhotoOfTheDay();
        await driver.sleep(3000);

        const buttons = await driver.findElementsByClassName(driver.locators.button);

        assert.isTrue(buttons.length >= 5);
        await driver.navBack();

        const showSideDrawerResult = await driver.compareScreen("side-drawer-closed", 5, 0.01);
        assert.isTrue(showSideDrawerResult);
    });
});