import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid } from "platform";
import { Page } from "ui/page";
import { ApodItem } from "../../models/apod-model";
import { ApodService } from "../../services/apod.service";

@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls:["./login.component.css"]
})
export class LoginComponent {
    public backgroundImage: string;
    public date: string;
    public desc: string = "100% free access";
    public loginText: string = "No Pass Login";
    public title: string;

    constructor(private page: Page, private routerExtensions: RouterExtensions, private apodService: ApodService) { 

        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.extractData();
    }

    ngAfterViewInit() {
        this.backgroundImage = "res://background";
    }

    login() {
        console.log("login func");
        this.routerExtensions.navigate(["/main"], { clearHistory: true }); // 
    }

    facebook() {
        console.log("facebook func");
    }

    google() {
        console.log("Google func");
    }

    get backgroundImageUrl() {
        if (this.backgroundImage) {
            return `url("${this.backgroundImage}")`;
        } 
     
        return `url("res://background")`;
     }

    private extractData() {
        this.apodService.getData()
            .subscribe((result) => {
                if (result.media_type === "image") {
                    this.backgroundImage = result.hdurl;
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
