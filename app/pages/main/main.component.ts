import { AfterViewInit, Component } from "@angular/core";
import { PageRoute } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid, isIOS } from "tns-core-modules/platform";
import { switchMap } from "rxjs/operators";

import { translateViewByXandYwithDurationAndCurve } from "../../shared/animations-helper";

@Component({
    selector: "cosmos-details",
    moduleId: module.id,
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.css"]
})
export class MainComponent implements AfterViewInit {
    apodTitle: string;
    asteroidTitle: string;
    roversTitle: string;
    detailsTitle: string;
    isAndroid: boolean = isAndroid;
    isIos: boolean = isIOS;
    username: string;
    drawer: RadSideDrawer;

    constructor(private _route: PageRoute, private _page: Page) {
        this.apodTitle = "Astronomical \nPhoto \nof the Day";
        this.asteroidTitle = "Asteroids\n Proximity\n Checker";
        this.roversTitle = "Mars Rovers \nPhotos \nDatabank";
        this.detailsTitle = "About\n Cosmos Databank\n Application";

        (<any>this._page).scrollableContent = false;

        this._route.activatedRoute
            .pipe(switchMap(activatedRoute => activatedRoute.queryParams))
            .forEach(params => {
                this.username = params["username"];
            });
    }

    ngAfterViewInit() {
        this.drawer = <RadSideDrawer>getRootView();
        this.drawer.gesturesEnabled = true;
    }

    toggleDrawer() {
        this.drawer.toggleDrawerState();
    }

    /* TODO: Test animation for all CardViews */
    onViewLoaded(
        args,
        translateFromX,
        translateToX,
        translateFromY,
        translateToY
    ) {
        let view = args.object;
        translateViewByXandYwithDurationAndCurve(
            view,
            translateFromX,
            translateToX,
            translateFromY,
            translateToY,
            600,
            "easeOut"
        );
    }
}
