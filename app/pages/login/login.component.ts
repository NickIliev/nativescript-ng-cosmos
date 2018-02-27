import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { login, logout, LoginType, User, FirebaseFacebookLoginOptions } from "nativescript-plugin-firebase";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { ApodItem } from "../../models/apod-model";
import { ApodService } from "../../services/apod.service";

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

    constructor(private page: Page, private routerExtensions: RouterExtensions, private apodService: ApodService) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.initData();
    }

    login() {
        this.routerExtensions.navigate(["/main"], {
            clearHistory: true,
            transition: {
                name: "fade",
                duration: 300
            }
        });
    }

    facebook() {
        console.log("facebook func");

        if (appSettings.getBoolean("isLogged")) {
            logout().then(() => {
                login({
                    type: LoginType.FACEBOOK,
                    facebookOptions: {
                        // defaults to ['public_profile', 'email']
                        scope: ['public_profile', 'email']
                    }
                }).then(user => {
                    // console.log("uid: " + user.uid)
                    // console.log("name: " + user.name);
                    // console.log("email: " + user.email);
                    // console.log("phoneNumber: " + user.phoneNumber);
                    // console.log("anonymous: " + user.anonymous);
                    // console.log("emailVerified: " + user.emailVerified);
                    // console.log("profileImageURL: " + user.profileImageURL);
                    // console.log("refreshToken: " + user.refreshToken)
                    this.routerExtensions.navigate(["/main"], {
                        clearHistory: true,
                        transition: {
                            name: "fade",
                            duration: 300
                        },
                        queryParams: {
                            name: user.name,
                            profileImageURL: user.profileImageURL
                        }
                    });
                }).catch(err => {
                    console.log(err);
                });
            })
        } else {
            login({
                type: LoginType.FACEBOOK,
                facebookOptions: {
                    // defaults to ['public_profile', 'email']
                    scope: ['public_profile', 'email']
                }
            }).then(user => {
                // console.log("uid: " + user.uid)
                // console.log("name: " + user.name);
                // console.log("email: " + user.email);
                // console.log("phoneNumber: " + user.phoneNumber);
                // console.log("anonymous: " + user.anonymous);
                // console.log("emailVerified: " + user.emailVerified);
                // console.log("profileImageURL: " + user.profileImageURL); // not working - use Facebook Graph instead
                // console.log("refreshToken: " + user.refreshToken)
                this.routerExtensions.navigate(["/main"], {
                    clearHistory: true,
                    transition: {
                        name: "fade",
                        duration: 300
                    },
                    queryParams: {
                        name: user.name
                    }
                });
            }).catch(err => {
                console.log(err);
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
                } else {
                    this.backgroundImage = "res://background";
                    return;
                }
            }, (error) => {
                console.log("Server Status Code: " + error.status);
            });
    }
}
