
import { Page } from "ui/page";
import { Component, OnInit } from "@angular/core";
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
    dateToLoad: string; // API string represenation of the currently loaded date
    direction: boolean; // true means going to Prevous date; false means going to Next date
    toolbarHelper : ToolbarHelper;

    constructor(private apodService: ApodService, private page: Page) {
        this.toolbarHelper = new ToolbarHelper();
        
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.dateToLoad = this.toolbarHelper.dateToString(this.lastLoadedDate);
        this.extractData(this.dateToLoad); // initially load TODAY's pic
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