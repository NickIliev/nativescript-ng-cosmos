import { AppCenter } from "nativescript-app-center";
import { isAndroid } from "tns-core-modules/platform";
import SETTINGS from "../settings.json";

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
