import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import { View } from "tns-core-modules/ui/core/view";
import { alert, confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";
import { GestureEventData, PinchGestureEventData, PanGestureEventData } from "tns-core-modules/ui/gestures";
import { Image } from "tns-core-modules/ui/image";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid } from "tns-core-modules/platform";
import { ScrollView } from "tns-core-modules/ui/scroll-view";

import { Component, ViewChild, ElementRef } from "@angular/core";

import { ApodItem } from "../../models/apod-model";
import { ApodService } from "../../services/apod.service";

import { ToolbarHelper } from "../../shared/toolbar-helper";
import { onDoubleTap as onDoubleZoom, onPan as onPanZoom, onPinch as onPinchZoom } from "../../shared/zoom-helper";

@Component({
    selector: "ns-items",
    moduleId: module.id,
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

    dock: View;
    scroll: ScrollView;

    constructor(private apodService: ApodService, private page: Page) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.initData(); // initially load TODAY's pic
    }

    onDockLoaded(args) {
        this.dock = <View>args.object;
        // this.dock.translateY = 60;
        this.dock.translateY = 100;
        this.dock.translateX = 50;
        this.dock.animate({
            translate: { x: 0, y: -10 },
            duration: 1000
        });
    }

    onImageLoaded(args) {
        this.image = <Image>args.object;
        this.image.visibility = !this.image.isLoading ? "visible" : "collapse"; // on App resume check if image is already loaded or not

        this.image.on("isLoadingChange", (args) => {
            this.scroll.scrollToHorizontalOffset(0, true);
            this.scroll.scrollToVerticalOffset(0, true);

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

    onScrollLoaded(args) {
        this.scroll = <ScrollView>args.object;
    }

    onIndicatorLoaded(args) {
        this.indicator = args.object;
    }

    onNotify(message: string): void {
        if (message === "goToPrevousDay") {
            this.setPreviousDate();
        } else if (message === "goToNextDay") {
            this.setNextDate();
        } else if (message === "onShare") {
            this.toolbarHelper.onShare(this.item);
        } else if (message === "onSetWallpaper") {
            let options: ConfirmOptions = {
                // title: this.item.title,
                message: "Set as Wallpaper?",
                okButtonText: "Yes",
                cancelButtonText: "No",
                neutralButtonText: "Cancel"
            };
            confirm(options).then((result: boolean) => {
                // result can be true/false/undefined
                console.log("confirm result: " + result);
                if (result) {
                    this.toolbarHelper.onSetWallpaper(this.item);
                } else {
                    return;
                }
            });
        } else if (message === "onSaveFile") {
            let options: ConfirmOptions = {
                title: "Image Downloaded!",
                message: "Saved in /Pictures/CosmosDatabank",
                okButtonText: "OK"
            };
            alert(options).then(() => {
                this.toolbarHelper.onSaveFile(this.item);
            }); 
        }
    }

    private setPreviousDate() {
        this.direction = true;
        this.toolbarHelper.setPrevousDay(this.lastLoadedDate);
        this.extractData(this.toolbarHelper.dateToString(this.lastLoadedDate));
    }

    private setNextDate() {
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
    }

    private initData() {
        this.apodService.getData()
            .subscribe((result) => {
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

                    this.lastLoadedDate = new Date(result.date);
                } else if (result.media_type !== "image" && this.direction) {
                    // TODO: implement the logic for YouTube videos here
                    this.lastLoadedDate = new Date(result.date);
                    this.toolbarHelper.setPrevousDay(this.lastLoadedDate);
                    this.extractData(this.toolbarHelper.dateToString(this.lastLoadedDate));
                } else if (result.media_type !== "image" && !this.direction) {
                    // TODO: implement the logic for YouTube videos here
                    this.lastLoadedDate = new Date(result.date);
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
            })
    }

    private extractData(date: string) {
        this.apodService.getDataWithCustomDate(date)
            .subscribe((result) => {
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
            });
    }
}