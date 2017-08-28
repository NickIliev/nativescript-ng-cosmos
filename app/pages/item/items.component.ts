import { Page } from "ui/page";
import { Label } from "ui/label";
import { DockLayout } from "ui/layouts/dock-layout";
import { Component, OnInit, Input } from "@angular/core";

import { ApodItem } from "../../models/apod-model";
import { ApodService } from "../../services/apod.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
    styleUrls: ["./items.component.css"]
})
export class ItemsComponent {
    item: ApodItem = new ApodItem("", "", "", "", "", "", "", "");

    lastLoadedDate: Date = new Date(); // today
    dateToLoad: string;

    direction: boolean;

    constructor(private apodService: ApodService, private page: Page) {
        this.page.actionBarHidden = true;

        this.dateToLoad = this.dateToString(this.lastLoadedDate);
        this.extractData(this.dateToLoad); // initially load TODAY's pic
    }

    private dateToString(date: Date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getUTCDate();
    }

    private extractData(date: string) {
        this.apodService.getDataWithCustomDate(date)
            .subscribe((result) => {
                console.log(result["media_type"]);
                if (result["media_type"] === "image") {
                    this.item = new ApodItem(result["copyright"],
                        result["date"],
                        result["explanation"],
                        result["hdurl"],
                        result["media_type"],
                        result["service_version"],
                        result["title"],
                        result["url"]);
                } else if (result["media_type"] !== "image" && this.direction) {
                    this.goToPrevousDay();
                    // return; // implement the logic for YouTube videos here
                } else if (result["media_type"] !== "image" && !this.direction) {
                    this.goToNextDay();
                    // return; // implement the logic for YouTube videos here
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
        this.lastLoadedDate.setDate(this.lastLoadedDate.getDate() + 1); // next day - TODO: implement logic to prevent looking for photos in the future
        this.direction = false;

        this.extractData(this.dateToString(this.lastLoadedDate)); // load prevous day
    }

    navToInfo(args) {

    }

    // onHide(args) {
    //     let label = <Label>args.object;
    //     let dock = <DockLayout>label.parent;
    //     dock.visibility = "collapse";
    // }

}