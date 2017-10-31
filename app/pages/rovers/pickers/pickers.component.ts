import { Component } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { isAndroid } from "platform";

@Component({
	selector: 'pickers',
	moduleId: module.id,
	templateUrl: './pickers.component.html',
	styleUrls:['./pickers.component.css']
})

export class PickersComponent {
	rovers: Array<string>;

	day: number;
	month: number;
	year: number;

	constructor(private _page: Page, private _router: RouterExtensions) { 
		if (isAndroid) {
			this._page.actionBarHidden = true;
		}

		this.rovers = ["Curiosity", "Opportunity", "Spirit"];

		this.day = 1;
		this.month = 6;
		this.year = 2017;
	}

	goToPhotos() {
		console.log("goToPhotos");
		this._router.navigate(["/rovers/rover"]);
	}
}