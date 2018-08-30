import { knownFolders } from "tns-core-modules/file-system";
import { AppCenter } from "nativescript-app-center";

export const appCenter = new AppCenter;

export function getApiKey() {
    const documents = knownFolders.currentApp();
    const contents = JSON.parse(documents.getFile('settings.json').readTextSync());
    
    return contents.nasaApiKey;
}