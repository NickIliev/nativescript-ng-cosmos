import { ApodItem } from "../models/apod-model";
import { fromUrl } from "image-source";
import { isAndroid, isIOS } from "platform";
import { shareImage } from "nativescript-social-share";
import { ad } from "utils/utils";

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
        console.log("onSaveFile not implelented!");
    }

    onShare(item: ApodItem) {
        fromUrl(item.url).then(image => {
            if (isAndroid) {
                shareImage(image, item.title);
            } else if (isIOS) {
                shareImage(image);
            }
        })
    }

    onSetWallpaper(item: ApodItem) {
        // Android only feature!!
        if (isAndroid) {
            fromUrl(item.url).then(image => {
                let wallpaperManager = android.app.WallpaperManager.getInstance(ad.getApplicationContext());
                try {
                    wallpaperManager.setBitmap(image.android);
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
}