import { ApodItem } from "../models/apod-model";
import { alert } from "ui/dialogs";
import { fromUrl } from "image-source";
import { isAndroid, isIOS } from "platform";
import { shareImage } from "nativescript-social-share";
import { ad } from "utils/utils";

export class ToolbarHelper {

    goToPrevousDay(lastLoadedDate: Date, direction: boolean) {
        lastLoadedDate.setDate(lastLoadedDate.getDate() - 1); // previous day
        direction = true;
    }

    goToNextDay(lastLoadedDate: Date, direction: boolean): boolean {
        let isValidDate: boolean;

        let today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        console.log("lastLoadedDate: "+ lastLoadedDate);
        console.log("today: " + today.getDate());
        console.log("tomorrow: " + tomorrow.getDate());
        console.log(lastLoadedDate.getDate() < tomorrow.getDate());
        console.log(lastLoadedDate.getDate() !== today.getDate());
        console.log(lastLoadedDate.getMonth() === today.getMonth());

        if (lastLoadedDate <= tomorrow) {
            lastLoadedDate.setDate(lastLoadedDate.getDate() + 1); // next day - TODO: implement logic to prevent looking for photos in the future  
            direction = false; // false === go to next date
            isValidDate = true;
        } else {
            isValidDate = false;
            
            let options = {
                title: "No Photo Available!",
                message: "Future date requested - returning to today's pic.",
                okButtonText: "OK"
            };
            // show warnig if the user request photos from future date - perhaps disable the next button here
            alert(options).then(() => {
                console.log("No photos abailable");
            });
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