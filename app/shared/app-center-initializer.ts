import { knownFolders } from "tns-core-modules/file-system";
import { AppCenter } from "nativescript-app-center";
import { isAndroid } from "tns-core-modules/platform";

export const appCenter = new AppCenter();

export function initializeLoggers() {
    const documents = knownFolders.currentApp();
    const contents = JSON.parse(
        documents.getFile("settings.json").readTextSync()
    );

    if (contents.appCenterSecret) {
        // console.log(contents.appCenterSecret)
        appCenter.start({
            analytics: true,
            crashes: true,
            appSecret: isAndroid
                ? contents.appCenterSecret
                : contents.appCenterSecretIOS
        });
    }
}
