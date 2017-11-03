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
    lastLoadedDate: Date; // today
    dateToLoad: string; // API string represenation of the currently loaded date
    direction: boolean; // true means going to Prevous date; false means going to Next date
    toolbarHelper : ToolbarHelper;
    isBusy: boolean;
    indicator: ActivityIndicator;

    constructor(private apodService: ApodService, private page: Page) {
        this.toolbarHelper = new ToolbarHelper();
        this.lastLoadedDate = new Date();
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.dateToLoad = this.toolbarHelper.dateToString(this.lastLoadedDate);
        this.extractData(this.dateToLoad); // initially load TODAY's pic

        this.isBusy = true;
    }

    onImageLoaded(args) {
        let image = <Image>args.object;
        image.visibility = "collapse";

        image.on("isLoadingChange", (args) => {
            if (!image.isLoading) {
                image.visibility = "visible"; // show image - change indicator
                this.indicator.busy= false;
                this.indicator.visibility = "collapse";
                console.log("image LOADED");
            } else {
                image.visibility = "collapse";
                this.indicator.busy = true;
                this.indicator.visibility = "visible";
                console.log("image LOADING");
            }
        })
    }

    onBusyChanged(args) {
        this.indicator = <ActivityIndicator>args.object;
        console.log("indicator.busy changed to: " + this.indicator.busy);
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