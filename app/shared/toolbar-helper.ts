import { ApodItem } from "../models/apod-model";

import { ImageSource, fromUrl } from "tns-core-modules/image-source";
import { isAndroid, isIOS } from "tns-core-modules/platform";
import { shareImage } from "nativescript-social-share";
import { ad } from "tns-core-modules/utils/utils";
import { File, Folder, path, knownFolders } from "tns-core-modules/file-system";
import * as enums from "tns-core-modules/ui/enums";
import { alert } from "tns-core-modules/ui/dialogs/dialogs";
import * as app from "tns-core-modules/application";

export class ToolbarHelper {

    setPrevousDay(lastLoadedDate: Date) {
        lastLoadedDate.setDate(lastLoadedDate.getDate() - 1); // previous day
    }

    setNextDay(lastLoadedDate: Date): boolean {
        let isValidDate: boolean;
        let today = new Date();

        if (lastLoadedDate <= today) {
            lastLoadedDate.setDate(lastLoadedDate.getDate() + 1); // next day
            isValidDate = true;
        } else {
            isValidDate = false;
        }

        return isValidDate;
    }

    onSaveFile(item: ApodItem) {
        let url = item.url;
        let fileName = this.createFileName(url);
        let cosmosFolderPath;

        fromUrl(url).then(imageSource => {
            if (isAndroid) {
                let androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(
                    android.os.Environment.DIRECTORY_PICTURES).toString();
                cosmosFolderPath = path.join(androidDownloadsPath, "CosmosDatabank");

                let folder: Folder = Folder.fromPath(cosmosFolderPath);
                let myPath: string = path.join(cosmosFolderPath, fileName);
                let exists: boolean = File.exists(myPath);

                if (!exists) {
                    let saved: boolean = imageSource.saveToFile(myPath, "jpg");
                    this.broadCastToAndroidPhotos(new java.io.File(myPath));
                }
            } else if (isIOS) {
                // TODO : does this work? - where are the images ?
                let iosDownloadPath = knownFolders.documents();
                cosmosFolderPath = path.join(iosDownloadPath.path, "CosmosDataBank");

                let folder = Folder.fromPath(cosmosFolderPath);
                let myPath = path.join(cosmosFolderPath, fileName);
                let exists = File.exists(myPath);

                if (!exists) {
                    let saved = imageSource.saveToFile(myPath, "jpeg");
                    console.log("saved: " + saved);
                }
            }
        });
    }

    broadCastToAndroidPhotos(imageFile) {
        const mediaScanIntent = new android.content.Intent(android.content.Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        const contentUri = android.net.Uri.fromFile(imageFile);
        mediaScanIntent.setData(contentUri);
        app.android.foregroundActivity.sendBroadcast(mediaScanIntent);
    }

    onShare(item: ApodItem) {
        fromUrl(item.url).then(imageSource => {
            if (isAndroid) {
                shareImage(imageSource, item.title);
            } else if (isIOS) {
                shareImage(imageSource);
            }
        });
    }

    onSetWallpaper(url: string) {
        // Android only feature!!
        if (isAndroid) {
            fromUrl(url).then(imageSource => {
                let wallpaperManager = android.app.WallpaperManager.getInstance(ad.getApplicationContext());
                try {
                    wallpaperManager.setBitmap(imageSource.android);
                } catch (error) {
                    console.log(error);
                }
            });
        } else if (isIOS) {
            console.log("feature not implemented for iOS");
        }
    }

    dateToString(date: Date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    private createFileName(url: string): string {
        let fileName = url.substring(url.lastIndexOf("/") + 1);
        let n = fileName.indexOf(".");
        return fileName = fileName.substring(0, n !== -1 ? n : fileName.length) + ".jpeg";
    }
}
