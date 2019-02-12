import { Injectable } from "@angular/core";
import { AppCenter } from "nativescript-app-center";
import {
    login as providerLogin,
    LoginType,
    User
} from "nativescript-plugin-firebase";
import { getBoolean, getString, setBoolean, setString } from "tns-core-modules/application-settings";

@Injectable()
export class LoginService {
    constructor(private _appCenter: AppCenter) { }

    private authenticateAction(routerExtensions: any, uid: string, username: string, userPicture: string) {
        routerExtensions.navigate(["/main"], {
            clearHistory: true,
            transition: {
                name: "fade",
                duration: 300
            },
            queryParams: {
                uid: (uid || ""),
                username: (username || ""),
                userPicture: (userPicture || "")
            }
        });
    }

    login(routerExtensions: any) {
        if (getBoolean("isLogged")) {
            let uid = getString("uid");
            let username = getString("username");
            let userPicture = getString("userPicture");

            this._appCenter.trackEvent("Login", [{ key: "user", value: username }]);

            this.authenticateAction(routerExtensions, uid, username, userPicture);
        } else {
            this._appCenter.trackEvent("Anonymous Login", [
                { key: "user", value: "Anonymous" }
            ]);

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
        if (getBoolean("isLogged")) {
            let uid = getString("uid");
            let username = getString("username");
            let userPicture = getString("userPicture");

            this._appCenter.trackEvent("Facebook Login", [
                { key: "user", value: username }
            ]);

            this.authenticateAction(routerExtensions, uid, username, userPicture);
        } else {
            providerLogin({
                type: LoginType.FACEBOOK,
                facebookOptions: {
                    // defaults to ['public_profile', 'email']
                    scope: ["public_profile", "email"]
                }
            }).then((result) => {
                let user: User = result;
                this._appCenter.trackEvent("Facebook Login", [
                    { key: "user", value: user.name }
                ]);

                setBoolean("isLogged", true);
                setString("uid", user.uid);
                setString("username", user.name);
                setString("userPicture", user.additionalUserInfo.profile["picture"]["data"]["url"]);

                this.authenticateAction(
                    routerExtensions,
                    user.uid,
                    user.name,
                    user.additionalUserInfo.profile["picture"]["data"]["url"]
                );
            }).catch((errorMessage) => {
                // console.log(errorMessage);
            });
        }
    }

    google(routerExtensions: any) {
        if (getBoolean("isLogged")) {
            let uid = getString("uid");
            let username = getString("username");
            let userPicture = getString("userPicture");

            this._appCenter.trackEvent("Google Login", [
                { key: "user", value: username }
            ]);

            this.authenticateAction(routerExtensions, uid, username, userPicture);
        } else {
            providerLogin({
                type: LoginType.GOOGLE
            }).then((result) => {
                let user: User = result;
                this._appCenter.trackEvent("Google Login", [
                    { key: "user", value: user.name }
                ]);

                setBoolean("isLogged", true);
                setString("uid", user.uid);
                setString("username", user.name);
                setString("userPicture", user.additionalUserInfo.profile["picture"]["data"]["url"]);

                this.authenticateAction(
                    routerExtensions,
                    user.uid,
                    user.name,
                    user.additionalUserInfo.profile["picture"]["data"]["url"]
                );
            }).catch((errorMessage) => {
                // console.log(errorMessage);
            });
        }
    }
}
