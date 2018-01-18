import { ApodItem } from "../models/apod-model";
import { ImageSource, fromUrl } from "image-source";
import { isAndroid, isIOS } from "platform";
import { shareImage } from "nativescript-social-share";
import { ad } from "utils/utils";
import { File, Folder, path, knownFolders } from "file-system";
import * as enums from "ui/enums";
import { alert } from "tns-core-modules/ui/dialogs/dialogs";

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
                var androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
                cosmosFolderPath = path.join(androidDownloadsPath, "CosmosDataBank");

                let folder: Folder = Folder.fromPath(cosmosFolderPath);
                let myPath: string = path.join(cosmosFolderPath, fileName);
                let exists: boolean = File.exists(myPath);
            
                if (!exists) {
                    let saved: boolean = imageSource.saveToFile(myPath, "jpg");
                    console.log("saved: " + saved);
                    alert("Image saved!");
                }
            } else if (isIOS) {
                // TODO : does this work? - where are the images ?
                var iosDownloadPath = knownFolders.documents();
                cosmosFolderPath = path.join(iosDownloadPath.path, "CosmosDataBank");

                let folder = Folder.fromPath(cosmosFolderPath);
                let myPath = path.join(cosmosFolderPath, fileName);
                let exists = File.exists(myPath);
            
                if (!exists) {
                    let saved = imageSource.saveToFile(myPath, "jpeg");
                    console.log("saved: " + saved);
                    alert("Image saved!");
                }
            }
        });
    }

    onShare(item: ApodItem) {
        fromUrl(item.url).then(imageSource => {
            if (isAndroid) {
                shareImage(imageSource, item.title);
            } else if (isIOS) {
                shareImage(imageSource);
            }
        })
    }

    onSetWallpaper(item: ApodItem) {
        // Android only feature!!
        if (isAndroid) {
            fromUrl(item.url).then(imageSource => {
                let wallpaperManager = android.app.WallpaperManager.getInstance(ad.getApplicationContext());
                try {
                    wallpaperManager.setBitmap(imageSource.android);
                } catch (error) {
                    console.log(error);
                }
            })
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