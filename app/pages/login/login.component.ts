import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid } from "platform";
import { Page } from "ui/page";
import { ApodItem } from "../../models/apod-model";
import { ApodService } from "../../services/apod.service";
import * as appSettings from "application-settings";
import { login, logout, LoginType } from "nativescript-plugin-firebase";
@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls:["./login.component.css"]
})
export class LoginComponent {
    public backgroundImage: string = "res://background";
    public date: string;
    public descText: string = "100% free access";
    public loginText: string = "No Pass Login";
    public title: string;

    constructor(private page: Page, private routerExtensions: RouterExtensions, private apodService: ApodService) { 
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.initData();
    }

    login() {
        this.routerExtensions.navigate(["/main"], { clearHistory: true , transition: {
            name: "fade",
            duration: 300
        }});
    }

    facebook() {
        console.log("facebook func");

        if (appSettings.getBoolean("isLogged")) {
            logout().then(() => {
                login({
                    type: LoginType.FACEBOOK,
                    scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
                }).then(user => {
                    //this.navigateWithContext(user, "views/drawer-page");
                }).catch(err => {
                    //dialogs.alert(err);
                });
            })
        } else {
            login({
                type: LoginType.FACEBOOK,
                scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
            }).then(user => {
                //this.navigateWithContext(user, "views/drawer-page");
            }).catch(err => {
                //dialogs.alert(err);
            })          
        }
    }

    google() {
        console.log("Google func");
    }

    email() {
        console.log("Email func");
    }

    private initData() {
        this.apodService.getData()
            .subscribe((result) => {
                if (result.media_type === "image") {
                    this.backgroundImage = result.url; // or bigger hdurl
                    this.title = result.title;
                    this.date = result.date;
                }  else {
                    this.backgroundImage = "res://background";
                    return;
                }
            }, (error) => {
                console.log("Server Status Code: " + error.status);
            });
    }
}
