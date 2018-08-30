import { knownFolders } from "tns-core-modules/file-system";
import { AppCenter } from "nativescript-app-center";

export const appCenter = new AppCenter;

export function initializeLoggers() {
    const documents = knownFolders.currentApp();
    const contents = JSON.parse(documents.getFile('settings.json').readTextSync());

    if (contents.appCenterSecret) {
        console.log(contents.appCenterSecret)
        appCenter.start({
            analytics: true,
            crashes: true,
            appSecret: contents.appCenterSecret
        });
    }
}