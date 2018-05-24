import { Injectable } from "@angular/core";
import { login as fbLogin, LoginType, User, FirebaseFacebookLoginOptions } from "nativescript-plugin-firebase";
import * as appSettings from "tns-core-modules/application-settings";

@Injectable()
export class LoginService {

    constructor() { }

    login(routerExtensions: any) {
        if (appSettings.getBoolean("isLogged")) { 
            let username = appSettings.getString("username");

            routerExtensions.navigate(["/main"], {
                clearHistory: true,
                transition: {
                    name: "fade",
                    duration: 300
                },
                queryParams: {
                    username: username
                }
            });
        } else {
            routerExtensions.navigate(["/main"], {
                clearHistory: true,
                transition: {
                    name: "fade",
                    duration: 300
                }
            });
        }
    }

    facebook(routerExtensions: any) {
        if (appSettings.getBoolean("isLogged")) {
            let username = appSettings.getString("username");
            console.log("facebook username (isLogged): " + username);

            routerExtensions.navigate(["/main"], {
                clearHistory: true,
                transition: {
                    name: "fade",
                    duration: 300
                },
                queryParams: {
                    username: username
                }
            });
        } else {
            fbLogin({
                type: LoginType.FACEBOOK,
                facebookOptions: {
                    // defaults to ['public_profile', 'email']
                    scope: ["public_profile", "email"]
                }
            }).then(user => {
                console.log("facebook user.name: " + user.name);

                appSettings.setBoolean("isLogged", true);
                appSettings.setString("username", user.name);

                routerExtensions.navigate(["/main"], {
                    clearHistory: true,
                    transition: {
                        name: "fade",
                        duration: 300
                    },
                    queryParams: {
                        username: user.name
                    }
                });
            }).catch(err => {
                // console.log(err);
            });
        }
    }

    google(routerExtensions: any) {
        if (appSettings.getBoolean("isLogged")) {
            let username = appSettings.getString("username");
            console.log("google username (isLogged): " + username);

            routerExtensions.navigate(["/main"], {
                clearHistory: true,
                transition: {
                    name: "fade",
                    duration: 300
                },
                queryParams: {
                    username: username
                }
            });
        } else {
            fbLogin({
                type: LoginType.GOOGLE,
            }).then((result) => {
                let user: User = result;
                console.log("google user.name: " + user.name);

                appSettings.setBoolean("isLogged", true);
                appSettings.setString("username", user.name);

                routerExtensions.navigate(["/main"], {
                    clearHistory: true,
                    transition: {
                        name: "fade",
                        duration: 300
                    },
                    queryParams: {
                        username: user.name
                    }
                });
            }, (errorMessage) => {
                // console.log(errorMessage);
            });
        }
    }
}
