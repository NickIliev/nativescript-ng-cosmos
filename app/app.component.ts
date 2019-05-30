import { AppService } from "./app.service";
import { RouterExtensions } from "nativescript-angular/router";
import { requestPermission } from "nativescript-permissions";
import {
    getCurrentPushToken,
    init,
    logout
} from "nativescript-plugin-firebase";
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild
} from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { setBoolean, setString } from "tns-core-modules/application-settings";
import { isAndroid, isIOS } from "tns-core-modules/platform";
import { Button } from "tns-core-modules/ui/button";
import { EventData } from "tns-core-modules/data/observable";
import { translateViewByXandYwithDurationAndCurve } from "./shared/animations-helper";

declare let TKSideDrawerShadowModeHostview: any;
// declare let TKSideDrawerBlurTypeNone: any;
// declare let TKSolidFill: any;

@Component({
    selector: "cosmos-app",
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild(RadSideDrawerComponent, { static: false }) drawerComponent: RadSideDrawerComponent;
    private _drawer: RadSideDrawer;
    isUserLogged: boolean = false; // hide & show LOGOUT button option

    constructor(
        private _changeDetectionRef: ChangeDetectorRef,
        private _routerExtensions: RouterExtensions,
        private _drawerService: AppService
    ) {
        if (isAndroid) {
            requestPermission([
                "android.permission.INTERNET",
                "android.permission.READ_EXTERNAL_STORAGE",
                "android.permission.WRITE_EXTERNAL_STORAGE",
                "android.permission.SET_WALLPAPER",
                "android.permission.ACCESS_NETWORK_STATE"
            ], "I need these permissions");
        }
    }

    onRadLoaded(args) {
        let drawer = args.object as RadSideDrawer;

        if (isIOS) {
            /* Make RadSidweDrawer transparent on iOS */
            let tkDrawer = drawer.nativeViewProtected.defaultSideDrawer;
            tkDrawer.style.shadowMode = TKSideDrawerShadowModeHostview;
            // tkDrawer.style.shadowOffset = CGSizeMake(-2, -0.5);
            // tkDrawer.style.shadowRadius = 50;
            // tkDrawer.fill = TKSolidFill.solidFillWithColor(new Color(0,0,0,0).ios)
            // tkDrawer.style.blurType = TKSideDrawerBlurTypeNone;
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
            onPushTokenReceivedCallback: function (token) {
                // console.log("Firebase push token: " + token);
            },

            // optional but useful to immediately re-logon the user when he re-visits your app
            onAuthStateChanged: data => {
                if (data.loggedIn) {
                    setBoolean("isLogged", true);
                } else {
                    setBoolean("isLogged", false);
                    setString("uid", "");
                    setString("username", "");
                    setString("userPicture", "");
                }
            }
        }).then((instance) => {
            // console.log("firebase.init done");
        }).catch((error) => {
            // console.log(`firebase.init error: ${error}`);
        });

        getCurrentPushToken().then((token: string) => {
            // may be null if not known yet
            // console.log("Current push token: " + token);
        });
    }

    /* The drawer animation effect by using different starting Y point for each button */
    onViewLoaded(args: EventData) {
        let btn = args.object as Button;
        let startingPointY: number = 0;
        setTimeout(() => {
            // Get the different Y point for each sidedrawer button
            startingPointY = btn.getLocationRelativeTo(btn.parent as any).y;
        }, 200);

        this._drawer.on("drawerOpening", () => {
            translateViewByXandYwithDurationAndCurve(
                btn, // view
                0, // from X
                0, // to X
                -300 + (startingPointY * 2), // from Y (different starting points wil result -/+ values)
                0, // to Y
                500, // ms
                "easeOut"
            );
        });

        this._drawer.on("drawerClosing", () => {
            translateViewByXandYwithDurationAndCurve(
                btn, // view
                0, // from X
                0, // to X
                0, // from Y
                -300 + (startingPointY * 4), // to Y (different starting points wil result -/+ values)
                500, // ms
                "easeIn"
            );
        });
    }

    ngAfterViewInit() {
        this._drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();

        /*
            Only when the main-page.componenty is loaded, we are checking the Auth state
            and using isUserLogged boolean to show/hide the logout button
        */
        this._drawerService.currentState.subscribe(isLogged => this.isUserLogged = isLogged);
    }

    navigateTo(path: string, clearHistory: boolean) {
        this._routerExtensions
            .navigate([path], {
                clearHistory: clearHistory,
                transition: {
                    name: this._drawerService.pageTransition,
                    duration: this._drawerService.duration
                }
            })
            .then(() => {
                this._drawer.closeDrawer();
            });
    }

    firebaseLogout() {
        logout().then(() => {
            setBoolean("isLogged", false);
            setString("uid", "");
            setString("username", "");
            setString("userPicture", "");

            this._drawer.closeDrawer();

            this._routerExtensions.navigate(["/login"], {
                clearHistory: true,
                transition: {
                    name: this._drawerService.pageTransition,
                    duration: this._drawerService.duration
                }
            });
        });
    }
}
