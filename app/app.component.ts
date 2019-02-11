import { RouterExtensions } from "nativescript-angular/router";
import { requestPermission } from "nativescript-permissions";
import {
    getCurrentPushToken,
    init,
    logout
} from "nativescript-plugin-firebase";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid } from "tns-core-modules/platform";
import { Button } from "tns-core-modules/ui/button";
import { EventData } from "tns-core-modules/data/observable";
import { translateViewByXandYwithDurationAndCurve } from "./shared/animations-helper";

import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild
} from "@angular/core";

@Component({
    selector: "cosmos-app",
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, AfterViewInit {
    private _drawer: RadSideDrawer;
    private _btn: Button;

    @ViewChild(RadSideDrawerComponent)
    drawerComponent: RadSideDrawerComponent;
    isUserLogged: boolean = false;

    constructor(
        private _changeDetectionRef: ChangeDetectorRef,
        private _routerExtensions: RouterExtensions
    ) {
        if (isAndroid) {
            requestPermission(
                [
                    "android.permission.INTERNET",
                    "android.permission.READ_EXTERNAL_STORAGE",
                    "android.permission.WRITE_EXTERNAL_STORAGE",
                    "android.permission.SET_WALLPAPER",
                    "android.permission.ACCESS_NETWORK_STATE"
                ],
                "I need these permissions"
            )
                .then(res => {
                    console.log("Permissions granted!");
                })
                .catch(err => {
                    console.log("No permissions!");
                });
        }
    }

    ngOnInit() {
        init({
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
            onMessageReceivedCallback: (message: any) => {
                // console.log(`Title: ${message.title}`);
                // console.log(`Body: ${message.body}`);
                // if your server passed a custom property called 'foo', then do this:
                // console.log(`Value of 'foo': ${message.data.foo}`);
            },
            onPushTokenReceivedCallback: function(token) {
                // console.log("Firebase push token: " + token);
            },

            // optional but useful to immediately re-logon the user when he re-visits your app
            onAuthStateChanged: data => {
                // console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
                if (data.loggedIn) {
                    // console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
                    // console.log("user's name: " + (data.user.name ? data.user.name : "N/A"));
                    this.isUserLogged = true;
                    appSettings.setBoolean("isLogged", true);
                    appSettings.setString(
                        "username",
                        data.user.name ? data.user.name : "N/A"
                    );
                } else {
                    this.isUserLogged = false;
                    appSettings.setBoolean("isLogged", false);
                    appSettings.setString("username", "");
                }
            }
        }).then(instance => {
                console.log("firebase.init done");
            }, error => {
                console.log(`firebase.init error: ${error}`);
            }
        );

        getCurrentPushToken().then((token: string) => {
            // may be null if not known yet
            // console.log("Current push token: " + token);
        });
    }

    onViewLoaded(args: EventData) {
        let btn = args.object as Button;
        let startingPointY: number = 0;
        setTimeout(() => {
            startingPointY = btn.getLocationRelativeTo(btn.parent as any).y;
        }, 200);

        this._drawer.on("drawerOpening",() => {

            translateViewByXandYwithDurationAndCurve(
                btn, // view
                0, // from X
                0, // to X
                -300 + (startingPointY * 2), // from Y
                0, // to Y
                500, // ms
                "easeOut"
                )
        })

        this._drawer.on("drawerClosing",() => {
            translateViewByXandYwithDurationAndCurve(
                btn, // view
                0, // from X
                0, // to X
                0, // from Y
                -300 + (startingPointY * 4), // to Y
                500, // ms
                "easeIn"
                )
        })
    }

    onDrawerLoaded(args: EventData) {
        this._drawer = args.object as RadSideDrawer;
    }

    ngAfterViewInit() {
        this._drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    navigateTo(path: string, clearHistory: boolean) {
        this._routerExtensions
            .navigate([path], {
                transition: {
                    name: "fade",
                    duration: 300
                },
                clearHistory: clearHistory
            })
            .then(() => {
                this._drawer.closeDrawer();
            });
    }

    firebaseLogout() {
        logout().then(() => {
            this.isUserLogged = false;
            appSettings.setBoolean("isLogged", false);
            appSettings.setString("username", "");

            this._drawer.closeDrawer();

            this._routerExtensions.navigate(["/login"], {
                clearHistory: true,
                transition: {
                    name: "fade",
                    duration: 300
                }
            });
        });
    }
}
