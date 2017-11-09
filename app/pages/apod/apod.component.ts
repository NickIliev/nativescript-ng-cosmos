import { Page } from "ui/page";
import { ActivityIndicator } from "ui/activity-indicator";
import { Image } from "ui/image";
import { Component } from "@angular/core";
import { ApodItem } from "../../models/apod-model";
import { ApodService } from "../../services/apod.service";
import { isAndroid } from "platform";
import { ToolbarHelper } from "../../shared/toolbar-helper";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./apod.component.html",
    styleUrls: ["./apod.component.css"]
})
export class ApodComponent {
    item: ApodItem = new ApodItem("", "", "", "", "", "", "", "");
    lastLoadedDate: Date = new Date(); // today

    toolbarHelper : ToolbarHelper = new ToolbarHelper();
    direction: boolean; // true means going to Prevous date; false means going to Next date

    indicator: ActivityIndicator;
    image: Image;

    constructor(private apodService: ApodService, private page: Page) {

        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.extractData(this.toolbarHelper.dateToString(this.lastLoadedDate)); // initially load TODAY's pic
    }

    onImageLoaded(args) {
        this.image = <Image>args.object;
        this.image.visibility = !this.image.isLoading ? "visible" : "collapse"; // on App resume check if image is already loaded or not

        this.image.on("isLoadingChange", (args) => {
            if (!this.image.isLoading) {
                this.image.visibility = "visible"; // show image - change indicator
                this.indicator.busy= false;
                this.indicator.visibility = "collapse";
            } else {
                this.image.visibility = "collapse";
                this.indicator.busy = true;
                this.indicator.visibility = "visible";
            }
        })
    }

    onBIndicatorLoaded(args) {
        this.indicator = <ActivityIndicator>args.object;
    }

    onNotify(message: string): void {
        if (message === "goToPrevousDay") {
            this.toolbarHelper.goToPrevousDay(this.lastLoadedDate, this.direction);
            this.extractData(this.toolbarHelper.dateToString(this.lastLoadedDate));
        } else if (message === "goToNextDay") {
            let isValideDate = this.toolbarHelper.goToNextDay(this.lastLoadedDate, this.direction);
            if (isValideDate) {
                this.extractData(this.toolbarHelper.dateToString(this.lastLoadedDate));
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
                if (result.media_type === "image") {
                    this.item = new ApodItem(result.copyright, result.date, result.explanation, result.hdurl, result.media_type, result.service_version, result.title, result.url);
                } else if (result.media_type !== "image" && this.direction) {
                    // return; // implement the logic for YouTube videos here
                    this.toolbarHelper.goToPrevousDay(this.lastLoadedDate, this.direction);
                    this.extractData(this.toolbarHelper.dateToString(this.lastLoadedDate));
                } else if (result.media_type !== "image" && !this.direction) {
                    // return; // implement the logic for YouTube videos here
                    let isValideDate = this.toolbarHelper.goToNextDay(this.lastLoadedDate, this.direction);
                    if (isValideDate) {
                        this.extractData(this.toolbarHelper.dateToString(this.lastLoadedDate));
                    }
                } else {
                    return;
                }
            }, (error) => {
                console.log(error);
            });
    }
}