import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { openUrl } from "tns-core-modules/utils/utils";

@Component({
    selector: "cosmos-info",
    moduleId: module.id,
    templateUrl: "./info.component.html",
    styleUrls: ["./info.component.css"]
})
export class InfoComponent {
    // tslint:disable-next-line
    public description: string = "Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.";

    constructor(private _page: Page, private _routerExtensions: RouterExtensions) {
        if (isAndroid) {
            this._page.actionBarHidden = true;
        }
    }

    onNativeScriptTap() {
        openUrl("https://docs.nativescript.org");
    }

    onNasaTap() {
        openUrl("https://api.nasa.gov");
    }

    onApodLink() {
        this._routerExtensions.navigate(["/apod"], {
            transition: {
                name: "fade",
                duration: 300
            }
        });
    }
    onApodURL() {
        openUrl("https://apod.nasa.gov/apod/astropix.html");
    }
}
