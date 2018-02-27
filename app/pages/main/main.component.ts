import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CardView } from "nativescript-cardview";
import { User } from "nativescript-plugin-firebase";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { isAndroid, isIOS } from "tns-core-modules/platform";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { View } from "tns-core-modules/ui/core/view";
import { translateViewByXandYwithDurationAndCurve } from "../../shared/animations-helper";

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./main.component.html",
    styleUrls: ['./main.component.css']
})
export class MainComponent {
    public apodTitle: string;
    public asteroidTitle: string;
    public roversTitle: string;
    public detailsTitle: string;
    public isAndroid: boolean = isAndroid;
    public isIos: boolean = isIOS;

    public name: string;
    // public profileImageURL: string;

    private drawer: RadSideDrawer;
    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

    constructor(private route: ActivatedRoute, private _changeDetectionRef: ChangeDetectorRef) {
        this.apodTitle = "Astronomical \nPhoto \nof the Day";
        this.asteroidTitle = "Asteroids\n Proximity\n Checker";
        this.roversTitle = "Mars Rovers \nPhotos \nDatabank";
        this.detailsTitle = "About\n Cosmos Databank\n Application";

        this.route.queryParams.subscribe(params => {
            this.name = params["name"];
            // this.profileImageURL = params["profileImageURL"];
            // console.log("main-page profile pic ULR: " + this.profileImageURL);
        });
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    public toggleDrawer() {
        this.drawer.toggleDrawerState();
    }

    /* TODO: Test animation for all CardViews */
    public onViewLoaded(args, translateFromX, translateToX, translateFromY, translateToY) {
        let view = args.object;
        translateViewByXandYwithDurationAndCurve(view, translateFromX, translateToX, translateFromY, translateToY, 600, "easeOut");
    }

}
