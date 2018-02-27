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
            let username = appSettings.getString("username");

            this.routerExtensions.navigate(["/main"], {
                clearHistory: true,
                transition: {
                    name: "fade",
                    duration: 300
                },
                queryParams: {
                    name: username
                }
            });
        } else {
            login({
                type: LoginType.FACEBOOK,
                facebookOptions: {
                    // defaults to ['public_profile', 'email']
                    scope: ['public_profile', 'email']
                }
            }).then(user => {
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

        if (appSettings.getBoolean("isLogged")) {
            let username = appSettings.getString("username");

            this.routerExtensions.navigate(["/main"], {
                clearHistory: true,
                transition: {
                    name: "fade",
                    duration: 300
                },
                queryParams: {
                    name: username
                }
            });
        } else {
            login({
                type: LoginType.GOOGLE,
            }).then((result) => {
                let user: User = result;
                console.log(user);

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
            }, (errorMessage) => {
                console.log(errorMessage);
            });
        }
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
                // TODO handle error status codes with appropriate error UI
            });
    }
}
