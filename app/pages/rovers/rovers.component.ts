import { Page } from "ui/page";
import { ItemEventData } from "ui/list-view";
import { isAndroid } from "platform";
import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { RoverPhoto } from "../../models/rover-model";
import { RoverPhotosService } from "../../services/rover.service";
import { Observable as RxObservable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Component({
    selector: "rovers",
    moduleId: module.id,
    templateUrl: "./rovers.component.html",
    styleUrls: ["./rovers.component.css"]
})
export class RoversComponent {

    public roverPhotos: RxObservable<Array<RoverPhoto>>;
    public isAndroid: boolean;

    private tempArr: Array<RoverPhoto> = [];
    private pageIndex: number;
    private subscr;

    constructor(private roverService: RoverPhotosService, private page: Page, private routerExtensions: RouterExtensions) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.isAndroid = isAndroid;

        this.pageIndex = 1;
        this.extractData("2017-06-21", this.pageIndex);
    }

    private extractData(date: string, pageIndex: number) {
        this.roverService.getPhotosWithDateAndPageIndex("curiosity", 2017, 6, 21, pageIndex)
            .subscribe((itemsList) => {
                this.tempArr = itemsList;

                this.roverPhotos = RxObservable.create(subscriber => {
                    this.subscr = subscriber;
                    subscriber.next(this.tempArr);
                });
            }, (error) => {
                console.log(error);
            });
    }

    public onLoadMoreItemsRequested(args) {
        this.roverService.getPhotosWithDateAndPageIndex("curiosity", 2017, 6, 21, ++this.pageIndex)
            .subscribe((itemsList) => {
                itemsList.forEach(element => {
                    this.tempArr.push(element);
                });

                this.subscr.next(this.tempArr);
            })
    }

    public onItemTap(args:ItemEventData) {
        let index = args.index;
        let photo = this.tempArr[index];

        this.routerExtensions.navigate(["/rovers/photo"], {
            replaceUrl: false,
            queryParams: {
                id: photo.id,
                cameraFullName: photo.cameraFullName,
                cameraName: photo.cameraName,
                cameraId: photo.cameraId,
                cameraRoverId: photo.cameraRoverId,
                imageUri: photo.imageUri,
                earthDate: photo.earthDate,
                sol: photo.sol    
            }
        });
    }

    private getItem(items: Array<RoverPhoto>, id: number): RoverPhoto {
        return items.filter(item => item.id === id)[0];
    }
}