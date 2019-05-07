import { AppiumDriver, createDriver, SearchOptions, Point, nsCapabilities } from "nativescript-dev-appium";
import { assert } from "chai";

describe("sample scenario", async function () {
    let driver: AppiumDriver;
    let sideDrawerBtnRect: Point;

    before(async function () {
        nsCapabilities.testReporter.context = this;
        driver = await createDriver();
    });

    after(async function () {
        await driver.quit();
        console.log("Quit driver!");
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await driver.logTestArtifacts(this.currentTest.title);
        }
    });

    const openSidedrawer = async function () {
        if (driver.isAndroid) {
            if (!sideDrawerBtnRect) {
                const btnSideDrawer = await driver.findElementByText("COSMOS Databank");
                const sideDrawerRect = await btnSideDrawer.getRectangle();
                const displaySize = await driver.driver.getWindowSize();
                sideDrawerBtnRect = new Point(displaySize.width - 10, sideDrawerRect.y + sideDrawerRect.height / 2);
            }
            await driver.clickPoint(sideDrawerBtnRect.x, sideDrawerBtnRect.y);
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

    const closeSidedrawer = async function () {
        if (driver.isAndroid) {
            await driver.clickPoint(sideDrawerBtnRect.x, sideDrawerBtnRect.y);
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

    it("no pass login", async function () {
        const allowCameraBtn = (await driver.findElementByTextIfExists("Allow"))
        if (allowCameraBtn) {
            await allowCameraBtn.click();
        }
        await (await driver.findElementByText("No Pass Login", SearchOptions.contains)).click();

        const astronomicalDayElement = await driver.findElementByText("Astronomical", SearchOptions.contains);

        assert.isTrue(astronomicalDayElement != null && (await astronomicalDayElement.isDisplayed()));
    });

    it("open sidedrawer menu", async function () {
        await openSidedrawer();
        const showSideDrawerResult = await driver.compareScreen("side-drawer-displayed", 5, 0.01);
        assert.isTrue(showSideDrawerResult);
    });

    it("close sidedrawer menu", async function () {
        await closeSidedrawer();
        const showSideDrawerResult = await driver.compareScreen("side-drawer-closed", 5, 0.01);
        assert.isTrue(showSideDrawerResult);
    });

    it("navigate to photo of the day and back", async function () {
        await openSidedrawer();
        await driver.sleep(5000);

        const navToPhotoOfTheDay = async function () {
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