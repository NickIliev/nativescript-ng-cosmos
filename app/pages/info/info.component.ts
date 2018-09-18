import { Component } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: "cosmos-info",
    moduleId: module.id,
    templateUrl: "./info.component.html"
})
export class InfoComponent {
    constructor(private _page: Page) {
        if (isAndroid) {
            this._page.actionBarHidden = true;
        }
    }
}
