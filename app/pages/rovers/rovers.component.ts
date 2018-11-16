import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid } from "tns-core-modules/platform";
import { alert } from "tns-core-modules/ui/dialogs";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { Page } from "tns-core-modules/ui/page";

import { RoverPhoto } from "../../models/rover-model";
import { RoverPhotosService } from "../../services/rover.service";
import { Observable as RxObservable } from "rxjs";

@Component({
    selector: "cosmos-rovers",
    moduleId: module.id,
    templateUrl: "./rovers.component.html",
    styleUrls: ["./rovers.component.css"]
})
export class RoversComponent implements OnInit, AfterViewInit {
    roverPhotos: RxObservable<Array<RoverPhoto>>;
    day: number;
    month: number;
    year: number;
    rover: string;

    private _tempArr: Array<RoverPhoto> = [];
    private _pageIndex: number;
    private _subscr;

    constructor(
        private _roverService: RoverPhotosService,
        private _page: Page,
        private _router: RouterExtensions,
        private _activatedRoute: ActivatedRoute
    ) {
        if (isAndroid) {
            this._page.actionBarHidden = true;
        }
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
        this._pageIndex = 1;
        this.extractData(
            this.rover,
            this.year,
            this.month,
            this.day,
            this._pageIndex
        );
    }

    private extractData(
        rover: string,
        year: number,
        month: number,
        day: number,
        _pageIndex: number
    ) {
        this._roverService
            .getPhotosWithDateAndPageIndex(rover, year, month, day, _pageIndex)
            .subscribe(
                itemsList => {
                    if (itemsList.length === 0) {
                        alert(
                            // tslint:disable-next-line
                            "No availabel photos for the selected date! Please choose different date from the selection page!"
                        ).then(() => {
                            this._router.back();
                        });
                    }

                    this._tempArr = itemsList;

                    this.roverPhotos = RxObservable.create(subscriber => {
                        this._subscr = subscriber;
                        subscriber.next(this._tempArr);
                    });
                },
                error => {
                    // console.log(error);
                }
            );
    }

    public onLoadMoreItemsRequested(args) {
        this._roverService
            .getPhotosWithDateAndPageIndex(
                this.rover,
                this.year,
                this.month,
                this.day,
                ++this._pageIndex
            )
            .subscribe(itemsList => {
                itemsList.forEach(element => {
                    this._tempArr.push(element);
                });

                this._subscr.next(this._tempArr);
            });
    }

    public onItemTap(args: ItemEventData) {
        let index = args.index;
        let photo = this._tempArr[index];
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
