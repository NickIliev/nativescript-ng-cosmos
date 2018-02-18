import { Component } from "@angular/core";
import { isAndroid } from "platform";
import { requestPermission } from "nativescript-permissions";
 
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
                }).catch((err) => {
                }); 
        }
    }
}
