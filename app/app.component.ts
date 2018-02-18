import { Component } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { requestPermission } from "nativescript-permissions";
import { getCurrentPushToken, init } from "nativescript-plugin-firebase";

import * as appSettings from "application-settings";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    constructor() {
        if (isAndroid) {
            requestPermission([
                "android.permission.INTERNET",
                "android.permission.READ_EXTERNAL_STORAGE",
                "android.permission.WRITE_EXTERNAL_STORAGE",
                "android.permission.SET_WALLPAPER",
                "android.permission.ACCESS_NETWORK_STATE"
            ], "I need these permissions")
                .then((res) => {
                    console.log("Permissions granted!");
                }).catch((err) => {
                    console.log("No permissions!");
                }); 
        }
    }

    ngOnInit() {
        init({
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
                onMessageReceivedCallback: (message: any) => {
                    console.log(`Title: ${message.title}`);
                    console.log(`Body: ${message.body}`);
                    // if your server passed a custom property called 'foo', then do this:
                    console.log(`Value of 'foo': ${message.data.foo}`);
                },
                onPushTokenReceivedCallback: function(token) {
                    console.log("Firebase push token: " + token);
                },

                onAuthStateChanged: function (data) { // optional but useful to immediately re-logon the user when he re-visits your app
                    console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
                    if (data.loggedIn) {
                        console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
                        appSettings.setBoolean("isLogged", true);
                    } else {
                        appSettings.setBoolean("isLogged", false);
                    }
                },
        
            }).then(instance => {
                console.log("firebase.init done");
            }, error => {
                console.log(`firebase.init error: ${error}`);
            }
        );

        getCurrentPushToken().then((token: string) => {
            // may be null if not known yet
            console.log("Current push token: " + token);
        });  
    }

}
