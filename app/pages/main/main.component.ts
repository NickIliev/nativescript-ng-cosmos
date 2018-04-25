import { AfterViewInit, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CardView } from "nativescript-cardview";
import { User } from "nativescript-plugin-firebase";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application";
import { isAndroid, isIOS } from "tns-core-modules/platform";
import { View } from "tns-core-modules/ui/core/view";
import { translateViewByXandYwithDurationAndCurve } from "../../shared/animations-helper";

import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: "cosmos-details",
    moduleId: module.id,
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.css"]
})
export class MainComponent implements AfterViewInit {
    public apodTitle: string;
    public asteroidTitle: string;
    public roversTitle: string;
    public detailsTitle: string;
    public isAndroid: boolean = isAndroid;
    public isIos: boolean = isIOS;

    public name: string;

    public drawer: RadSideDrawer;

    constructor(private route: ActivatedRoute, private _page: Page) {
        this.apodTitle = "Astronomical \nPhoto \nof the Day";
        this.asteroidTitle = "Asteroids\n Proximity\n Checker";
        this.roversTitle = "Mars Rovers \nPhotos \nDatabank";
        this.detailsTitle = "About\n Cosmos Databank\n Application";

        (<any>this._page).scrollableContent = false;

        this.route.queryParams.subscribe(params => {
            this.name = params["name"];

            console.log("[MainComponent] User " + this.name);
            // this.profileImageURL = params["profileImageURL"];
            // console.log("main-page profile pic ULR: " + this.profileImageURL);
        });
    }

    ngAfterViewInit() {
        this.drawer = <RadSideDrawer>getRootView();
        this.drawer.gesturesEnabled = true;
        console.log("NG AFTER VIEW INIT!!!");
        console.log(this.drawer);

    }

    toggleDrawer() {
        this.drawer.toggleDrawerState();
    }

    /* TODO: Test animation for all CardViews */
    onViewLoaded(args, translateFromX, translateToX, translateFromY, translateToY) {
        let view = args.object;
        translateViewByXandYwithDurationAndCurve(
            view,
            translateFromX,
            translateToX,
            translateFromY,
            translateToY,
            600,
            "easeOut");
    }
}
