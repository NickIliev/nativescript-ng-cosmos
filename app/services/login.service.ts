import { Injectable } from "@angular/core";
import { AppCenter } from "nativescript-app-center";
import {
  login as fbLogin,
  LoginType,
  User
} from "nativescript-plugin-firebase";
import * as appSettings from "tns-core-modules/application-settings";

@Injectable()
export class LoginService {
  constructor(private _appCenter: AppCenter) {}

  login(routerExtensions: any) {
    if (appSettings.getBoolean("isLogged")) {
      let username = appSettings.getString("username");
      this._appCenter.trackEvent("Login", [{ key: "user", value: username }]);

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
    if (appSettings.getBoolean("isLogged")) {
      let username = appSettings.getString("username");
      this._appCenter.trackEvent("Facebook Login", [
        { key: "user", value: username }
      ]);

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
      })
        .then(user => {
          this._appCenter.trackEvent("Facebook Login", [
            { key: "user", value: user.name }
          ]);

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
        })
        .catch(err => {
          // console.log(err);
        });
    }
  }

  google(routerExtensions: any) {
    if (appSettings.getBoolean("isLogged")) {
      let username = appSettings.getString("username");
      this._appCenter.trackEvent("Google Login", [
        { key: "user", value: username }
      ]);

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
        type: LoginType.GOOGLE
      }).then(
        result => {
          let user: User = result;
          this._appCenter.trackEvent("Google Login", [
            { key: "user", value: user.name }
          ]);

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
        },
        errorMessage => {
          // console.log(errorMessage);
        }
      );
    }
  }
}
