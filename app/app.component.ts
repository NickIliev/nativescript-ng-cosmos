import { Component } from "@angular/core";
import { isAndroid } from "platform";
import * as permissions from "nativescript-permissions";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    constructor() {
        if (isAndroid) {
            permissions.requestPermission([
                "android.permission.INTERNET",
                "android.permission.READ_EXTERNAL_STORAGE",
                "android.permission.WRITE_EXTERNAL_STORAGE",
                "android.permission.SET_WALLPAPER",
                "android.permission.ACCESS_NETWORK_STATE"
            ], "I need these permissions")
                .then((res) => {
                    console.log("Permissions granted!");
                }).catch(() => {
                    console.log("No permissions - plan B time!");
                });
        }
    }
}
