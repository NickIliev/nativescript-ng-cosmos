import { AppCenter } from "nativescript-app-center";
import { isAndroid } from "tns-core-modules/platform";

// import from for JSON not working beacuse of TSC bug https://github.com/Microsoft/TypeScript/issues/24715
const SETTINGS = require("../settings.json");

export const appCenter = new AppCenter();

export function initializeLoggers() {
    if (SETTINGS.appCenterSecret) {
        appCenter.start({
            analytics: true,
            crashes: true,
            appSecret: isAndroid ? SETTINGS.appCenterSecret : SETTINGS.appCenterSecretIOS
        });
    }
}
