import { Page } from "ui/page";
import { Label } from "ui/label";
import { DockLayout } from "ui/layouts/dock-layout";
import { alert } from "ui/dialogs";
import { Component, OnInit, Input} from "@angular/core";
import { ApodItem } from "../../models/apod-model";
import { ApodService } from "../../services/apod.service";
import { isAndroid, isIOS } from "platform";
import { ad } from "utils/utils";
import { shareImage, shareText, shareUrl } from "nativescript-social-share";
import { ImageSource, fromUrl } from "image-source";
import { EventData } from "data/observable";
import { Button } from "ui/button";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./apod.component.html",
    styleUrls: ["./apod.component.css"]
})
export class ApodComponent {
    item: ApodItem = new ApodItem("", "", "", "", "", "", "", "");
    lastLoadedDate: Date = new Date(); // today
    dateToLoad: string; // API string represenation of the currently loaded date
    direction: boolean; // true means going to Prevous date; false means going to Next date

    constructor(private apodService: ApodService, private page: Page) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.dateToLoad = this.dateToString(this.lastLoadedDate);
        this.extractData(this.dateToLoad); // initially load TODAY's pic
    }

    private dateToString(date: Date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getUTCDate();
    }

    private extractData(date: string) {
        this.apodService.getDataWithCustomDate(date)
            .subscribe((result) => {
                if (result.media_type === "image") {
                    this.item = new ApodItem(result.copyright, result.date, result.explanation, result.hdurl, result.media_type, result.service_version, result.title, result.url);
                } else if (result.media_type !== "image" && this.direction) {
                    // return; // implement the logic for YouTube videos here
                    this.goToPrevousDay();
                } else if (result.media_type !== "image" && !this.direction) {
                    // return; // implement the logic for YouTube videos here
                    this.goToNextDay();
                } else {
                    return;
                }
            }, (error) => {
                console.log(error);
            });
    }

    goToPrevousDay() {
        this.lastLoadedDate.setDate(this.lastLoadedDate.getDate() - 1); // previous day
        this.direction = true;

        this.extractData(this.dateToString(this.lastLoadedDate)); // load prevous day
    }

    goToNextDay() {
        
        let now = new Date();
        console.log("now: " + now);
        console.log("this.lastLoadedDate.getDate(): " + this.lastLoadedDate);
        console.log(this.lastLoadedDate <= now);
        if (this.lastLoadedDate <= now) {
            this.lastLoadedDate.setDate(this.lastLoadedDate.getDate() + 1); // next day - TODO: implement logic to prevent looking for photos in the future
            this.direction = false;
        } else {
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

        this.extractData(this.dateToString(this.lastLoadedDate)); // load prevous day
    }

    onShare() {
        fromUrl(this.item.hdurl).then(image => {
            console.log(image);

            if (isAndroid) {
                shareImage(image, this.item.title);
            } else if (isIOS) {
                shareImage(image);
            }
        })
    }

    onSetWallpaper() {
        // Android only feature!!
        fromUrl(this.item.hdurl).then(image => {
            let wallpaperManager = android.app.WallpaperManager.getInstance(ad.getApplicationContext());
            try {
                wallpaperManager.setBitmap(image.android);
            } catch (error) {
                console.log(error);
            }
        })
    }
}