import { Page } from "ui/page";
import { ActivityIndicator } from "ui/activity-indicator";
import { Image } from "ui/image";
import { Component } from "@angular/core";
import { ApodItem } from "../../models/apod-model";
import { ApodService } from "../../services/apod.service";
import { isAndroid } from "platform";
import { ToolbarHelper } from "../../shared/toolbar-helper";
import { alert } from "ui/dialogs";

@Component({
    selector: "ns-items",
    
    templateUrl: "./apod.component.html",
    styleUrls: ["./apod.component.css"]
})
export class ApodComponent {
    item: ApodItem = new ApodItem("", "", "", "", "", "", "", "");
    lastLoadedDate: Date = new Date(); // today

    toolbarHelper: ToolbarHelper = new ToolbarHelper();

    /* 
    [direction: boolean]
    true === means going to Prevous date; 
    false === means going to Next date
        initial value set to true so when an YouTube Is loaded for INITIAL date 
        to set prveious day with (result.media_type !== "image" && this.direction)
        Remove when logic for other media types is implemented!!!
    */
    direction: boolean = true;

    indicator: ActivityIndicator;
    image: Image;

    constructor(private apodService: ApodService, private page: Page) {

        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        console.log("constructor: " + this.lastLoadedDate);
        this.extractData(this.toolbarHelper.dateToString(this.lastLoadedDate)); // initially load TODAY's pic
    }

    onImageLoaded(args) {
        this.image = <Image>args.object;
        this.image.visibility = !this.image.isLoading ? "visible" : "collapse"; // on App resume check if image is already loaded or not

        this.image.on("isLoadingChange", (args) => {
            if (!this.image.isLoading) {
                this.image.visibility = "visible"; // show image - change indicator
                this.indicator.busy = false;
                this.indicator.visibility = "collapse";
            } else {
                this.image.visibility = "collapse";
                this.indicator.busy = true;
                this.indicator.visibility = "visible";
            }
        })
    }

    onIndicatorLoaded(args) {
        this.indicator = <ActivityIndicator>args.object;
        this.indicator.busy = true;
    }

    onNotify(message: string): void {
        if (message === "goToPrevousDay") {
            this.direction = true;
            this.toolbarHelper.setPrevousDay(this.lastLoadedDate);
            this.extractData(this.toolbarHelper.dateToString(this.lastLoadedDate));
        } else if (message === "goToNextDay") {
            this.direction = false;
            let isValideDate = this.toolbarHelper.setNextDay(this.lastLoadedDate);

            if (isValideDate && this.lastLoadedDate <= new Date()) {
                this.extractData(this.toolbarHelper.dateToString(this.lastLoadedDate));
            } else {
                let options = {
                    title: "No Photo Available!",
                    message: "Future date requested - returning to today's pic.",
                    okButtonText: "OK"
                };
                // show warnig if the user request photos from future date - disable the next button here
                alert(options).then(() => {
                    console.log("No photos abailable - returning to today's pic");
                    this.lastLoadedDate = new Date();
                    this.extractData(this.toolbarHelper.dateToString(this.lastLoadedDate));
                });
            }
        } else if (message === "onShare") {
            this.toolbarHelper.onShare(this.item);
        } else if (message === "onSetWallpaper") {
            this.toolbarHelper.onSetWallpaper(this.item);
        } else if (message === "onSaveFile") {
            console.log("onSaveFile not implemented!");
        }
    }

    private extractData(date: string) {
        this.apodService.getDataWithCustomDate(date)
            .subscribe((result) => {
                console.log("subscriptiojn result: ");
                console.log(result.media_type);

                if (result.media_type === "image") {

                    this.item = new ApodItem(
                        result.copyright,
                        result.date,
                        result.explanation,
                        result.hdurl,
                        result.media_type,
                        result.service_version,
                        result.title,
                        result.url
                    );

                } else if (result.media_type !== "image" && this.direction) {

                    // TODO: implement the logic for YouTube videos here
                    this.toolbarHelper.setPrevousDay(this.lastLoadedDate);
                    this.extractData(this.toolbarHelper.dateToString(this.lastLoadedDate));

                } else if (result.media_type !== "image" && !this.direction) {

                    // TODO: implement the logic for YouTube videos here
                    let isValideDate = this.toolbarHelper.setNextDay(this.lastLoadedDate);
                    if (isValideDate) {
                        this.extractData(this.toolbarHelper.dateToString(this.lastLoadedDate));
                    } else {
                        return;
                    }

                } else {
                    return;
                }
            }, (error) => {
                console.log("Server Status Code: " + error.status);
                console.dir(error);
            });
    }
}