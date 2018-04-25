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
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements AfterViewInit {
    public backgroundImage: string = "res://background";
    public date: string;
    public descText: string = "100% free access";
    public loginText: string = "No Pass Login";
    public title: string;

    public drawer: RadSideDrawer;

    constructor(private page: Page,
        private routerExtensions: RouterExtensions,
        private apodService: ApodService,
        private loginService: LoginService) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
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
        this.loginService.login(this.routerExtensions);
    }

    facebook() {
        this.loginService.facebook(this.routerExtensions);
    }

    google() {
        this.loginService.google(this.routerExtensions);
    }

    email() {
        this.loginService.login(this.routerExtensions);
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
        console.log("initData");
        this.apodService.getData()
            .subscribe((result) => {
                console.log("RESULT: ");
                console.log(result);

                if (result.media_type === "image") {
                    this.backgroundImage = result.url; // or bigger hdurl
                    this.title = result.title;
                    this.date = result.date;
                } else {
                    this.backgroundImage = "res://background";
                }
            }, (error) => {
                console.log("Server Status Code: " + error.status);
                // TODO handle error status codes with appropriate error UI
            });
    }
}
