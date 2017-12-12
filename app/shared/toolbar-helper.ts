import { ApodItem } from "../models/apod-model";
import { fromUrl } from "image-source";
import { isAndroid, isIOS } from "platform";
import { shareImage } from "nativescript-social-share";
import { ad } from "utils/utils";

export class ToolbarHelper {

    goToPrevousDay(lastLoadedDate: Date) {
        console.log("GO TO PREVIOUS DAY");
        console.log("BEFORE goToPrevousDay lastLoadedDate: " + (lastLoadedDate));
        lastLoadedDate.setDate(lastLoadedDate.getDate() - 1); // previous day

        console.log("AFTER goToPrevousDay lastLoadedDate: " + (lastLoadedDate));
    }

    goToNextDay(lastLoadedDate: Date): boolean {
        console.log("GO TO NEXTTT DAY");
        let isValidDate: boolean;

        let today = new Date();

        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (lastLoadedDate <= today) {
            lastLoadedDate.setDate(lastLoadedDate.getDate() + 1); // next day - TODO: implement logic to prevent looking for photos in the future  
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
        fromUrl(item.url).then(image => {
            let wallpaperManager = android.app.WallpaperManager.getInstance(ad.getApplicationContext());
            try {
                wallpaperManager.setBitmap(image.android);
            } catch (error) {
                console.log(error);
            }
        })
    }

    dateToString(date: Date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
}