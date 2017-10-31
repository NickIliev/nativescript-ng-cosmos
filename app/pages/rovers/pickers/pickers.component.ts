import { Component } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { DatePicker } from "ui/date-picker";
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
	}

	goToPhotos() {
		console.log("goToPhotos");
		this._router.navigate(["/rovers/rover"]);
	}

	onPickerLoaded(args) {
        let datePicker = <DatePicker>args.object;

        datePicker.year = 2017;
        datePicker.month = 6;
        datePicker.day = 2;
        datePicker.minDate = new Date(2008, 0, 29);
        datePicker.maxDate = new Date();
    }

    onDateChanged(args) {
        console.log("Date changed");
        console.log("New value: " + args.value);
        console.log("Old value: " + args.oldValue);
    }

    onDayChanged(args) {
        console.log("Day changed");
        console.log("New value: " + args.value);
        console.log("Old value: " + args.oldValue);
    }

    onMonthChanged(args) {
        console.log("Month changed");
        console.log("New value: " + args.value);
        console.log("Old value: " + args.oldValue);
    }

    onYearChanged(args) {
        console.log("Year changed");
        console.log("New value: " + args.value);
        console.log("Old value: " + args.oldValue);
    }
}