import { Component } from "@angular/core";
import { isAndroid } from "platform";
import { Page } from "ui/page";

@Component({
    selector: "ns-info",
    moduleId: module.id,
    templateUrl: "./info.component.html",
})
export class InfoComponent {

    constructor(private page: Page) { 
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
    }
}
