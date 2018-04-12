import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
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
export class LoginComponent {
    public backgroundImage: string = "res://background";
    public date: string;
    public descText: string = "100% free access";
    public loginText: string = "No Pass Login";
    public title: string;

    constructor(private page: Page,
        private routerExtensions: RouterExtensions,
        private apodService: ApodService,
        private loginService: LoginService) {
        if (isAndroid) {
            // this.page.actionBarHidden = true;
        }

        this.initData();
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
        this.apodService.getData()
            .subscribe((result) => {
                if (result.media_type === "image") {
                    this.backgroundImage = result.url; // or bigger hdurl
                    this.title = result.title;
                    this.date = result.date;
                } else {
                    this.backgroundImage = "res://background";
                }
            }, (error) => {
                // console.log("Server Status Code: " + error.status);
                // TODO handle error status codes with appropriate error UI
            });
    }
}
