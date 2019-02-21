import { AppService } from "../../app.service";
import { PageRoute } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application";
import { Page } from "tns-core-modules/ui/page";
import { switchMap } from "rxjs/operators";
import { translateViewByXandYwithDurationAndCurve } from "../../shared/animations-helper";
import { AfterViewInit, Component } from "@angular/core";
import { getBoolean } from "tns-core-modules/application-settings";

@Component({
    selector: "cosmos-details",
    moduleId: module.id,
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.css"]
})
export class MainComponent implements AfterViewInit {
    /* Section titles */
    apodTitle: string;
    asteroidTitle: string;
    roversTitle: string;
    detailsTitle: string;
    hubbleTitle: string;

    /* Auth user details */
    uid: string;
    username: string;
    userPicture: string;

    /* RadSideDrawer reference */
    drawer: RadSideDrawer;

    constructor(private _route: PageRoute, private _page: Page, private _drawerService: AppService) {
        this.apodTitle = "Astronomical \nPhoto \nof the Day";
        this.asteroidTitle = "Asteroids\n Proximity\n Checker";
        this.roversTitle = "Mars Rovers \nPhotos \nDatabank";
        this.hubbleTitle = "Hubble\n Telescope\n News";
        this.detailsTitle = "About \nCosmos Databank \nApplication";

        (<any>this._page).scrollableContent = false;

        this._route.activatedRoute
            .pipe(switchMap(activatedRoute => activatedRoute.queryParams))
            .forEach(params => {
                this.uid = params["uid"];
                this.username = params["username"];
                this.userPicture = params["userPicture"];
            });
    }


    ngAfterViewInit() {
        this.drawer = <RadSideDrawer>getRootView();
        this.drawer.gesturesEnabled = true;

        // Only when the main-page.componenty is loaded, we are checking the Auth state
        // and using isUserLogged this to show/hide the logout button
        this._drawerService.changeAuthState(getBoolean("isLogged"));
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
