import { Page } from "ui/page";
import { ItemEventData } from "ui/list-view";
import { isAndroid } from "platform";
import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

import { RoverPhoto } from "../../models/rover-model";
import { RoverPhotosService } from "../../services/rover.service";
import { Observable as RxObservable } from "rxjs/Observable";

import { alert } from "ui/dialogs";

import "rxjs/add/operator/map";

@Component({
    selector: "rovers",

    templateUrl: "./rovers.component.html",
    styleUrls: ["./rovers.component.css"]
})
export class RoversComponent {

    public roverPhotos: RxObservable<Array<RoverPhoto>>;
    public isAndroid: boolean;

    public day: number;
    public month: number;
    public year: number;
    public rover: string;

    private tempArr: Array<RoverPhoto> = [];
    private pageIndex: number;
    private subscr;

    constructor(private _roverService: RoverPhotosService, private _page: Page, private _router: RouterExtensions, private _activatedRoute: ActivatedRoute) {
        if (isAndroid) {
            this._page.actionBarHidden = true;
        }

        this.isAndroid = isAndroid;
    }

    ngOnInit() {
        if (this._activatedRoute.snapshot.queryParams) {
            const query = this._activatedRoute.snapshot.queryParams;

            this.rover = query.rover;
            this.day = query.day;
            this.month = query.month;
            this.year = query.year;
        }
    }

    ngAfterViewInit() {
        this.pageIndex = 1;
        this.extractData(this.rover, this.year, this.month, this.day, this.pageIndex);
    }

    private extractData(rover: string, year: number, month: number, day: number, pageIndex: number) {
        this._roverService.getPhotosWithDateAndPageIndex(rover, year, month, day, pageIndex)
            .subscribe((itemsList) => {
                if (itemsList.length === 0) {
                    alert("No availabel photos for the selected date! Please choose different date from the selection page!")
                        .then(() => {
                            this._router.back();
                        })
                }

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
        this._roverService.getPhotosWithDateAndPageIndex(this.rover, this.year, this.month, this.day, ++this.pageIndex)
            .subscribe((itemsList) => {
                itemsList.forEach(element => {
                    this.tempArr.push(element);
                });

                this.subscr.next(this.tempArr);
            })
    }

    public onItemTap(args: ItemEventData) {
        let index = args.index;
        let photo = this.tempArr[index];

        this._router.navigate(["/rovers/photo"], {
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
}