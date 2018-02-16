import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
import { CardView } from "nativescript-cardview";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';
import { isAndroid, isIOS } from "tns-core-modules/platform";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { View } from "tns-core-modules/ui/core/view";
import { translateViewByXandYwithDurationAndCurve } from "../../shared/animations-helper";
import { getCurrentPushToken, init } from "nativescript-plugin-firebase";

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./main.component.html",
    styleUrls: ['./main.component.css']
})
export class MainComponent {
    public apodTitle: string;
    public asteroidTitle: string;
    public roversTitle: string;
    public detailsTitle: string;
    public isAndroid: boolean = isAndroid;
    public isIos: boolean = isIOS;

    private drawer: RadSideDrawer;
    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

    constructor(private _changeDetectionRef: ChangeDetectorRef) {
        this.apodTitle = "Astronomical \nPhoto \nof the Day";
        this.asteroidTitle = "Asteroids\n Proximity\n Checker";
        this.roversTitle = "Mars Rovers \nPhotos \nDatabank";
        this.detailsTitle = "About\n Cosmos Databank\n Application";
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
                }
        
            }).then(instance => {
                console.log("firebase.init done");
            }, error => {
                console.log(`firebase.init error: ${error}`);
            }
        );
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();

        console.log("main afterView Init");
        getCurrentPushToken().then((token: string) => {
            // may be null if not known yet
            console.log("Current push token: " + token);
        });  
    }

    public toggleDrawer() {
        this.drawer.toggleDrawerState();
    }

    /* TODO: Test animation for all CardViews */
    public onViewLoaded(args, translateFromX, translateToX, translateFromY, translateToY) {
        let view = args.object;
        translateViewByXandYwithDurationAndCurve(view, translateFromX, translateToX, translateFromY, translateToY, 600, "easeOut");
    }

}
