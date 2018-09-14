import { AfterViewInit, Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";

import { ApodService } from "../../services/apod.service";
import { LoginService } from "../../services/login.service";
import { translateViewByXandYwithDurationAndCurve } from "../../shared/animations-helper";

@Component({
    selector: "cosmos-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    providers: [LoginService]
})
export class LoginComponent implements AfterViewInit {
    public backgroundImage: string = "res://background";
    public date: string;
    public descText: string = "100% free access";
    public drawer: RadSideDrawer;
    public loginText: string = "No Pass Login";
    public title: string;

    constructor(private _page: Page, private _routerExtensions: RouterExtensions, private _apodService: ApodService, private _loginService: LoginService) {
        if (isAndroid) {
            this._page.actionBarHidden = true;
        }

        this.initData();
    }

    ngAfterViewInit() {
        // use setTimeout otherwise there is no getRootView valid reference
        setTimeout(() => {
            this.drawer = <RadSideDrawer>getRootView();
            this.drawer.gesturesEnabled = false;
        }, 100);
    }

    login() {
        this._loginService.login(this._routerExtensions);
    }

    facebook() {
        this._loginService.facebook(this._routerExtensions);
    }

    google() {
        this._loginService.google(this._routerExtensions);
    }

    public onViewLoaded(args, translateFromX, translateToX, translateFromY, translateToY) {
        let view = args.object;
        translateViewByXandYwithDurationAndCurve(
            view,
            translateFromX,
            translateToX,
            translateFromY,
            translateToY,
            1200,
            "easeOut");
    }

    private initData() {
        this._apodService.getData()
            .subscribe((result) => {
                if (result["media_type"] === "image") {
                    this.backgroundImage = result["url"]; // or bigger hdurl
                    this.title = result["title"];
                    this.date = result["date"];
                } else {
                    this.backgroundImage = "res://background";
                }
            }, (error) => {
                console.log("Server Status Code: " + error.status);
                // TODO handle error status codes with appropriate error UI
            });
    }
}
