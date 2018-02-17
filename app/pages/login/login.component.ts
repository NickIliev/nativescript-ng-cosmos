import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid } from "platform";
import { Page } from "ui/page";

@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls:["./login.component.css"]
})
export class LoginComponent {

    public loginText: string = "No Pass Login";
    public desc: string = "100% access / no customization";

    constructor(private page: Page, private routerExtensions: RouterExtensions) { 

        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
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
}
