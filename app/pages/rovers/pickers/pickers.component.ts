import { Component } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { DatePicker } from "ui/date-picker";
import { ListPicker } from "ui/list-picker";
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

	selectedIndex: number;

	constructor(private _page: Page, private _router: RouterExtensions) { 
		if (isAndroid) {
			this._page.actionBarHidden = true;
		}

		this.rovers = ["Opportunity", "Curiosity", "Spirit"];
	}

	public selectedIndexChanged(args) {
        let picker = <ListPicker>args.object;
		console.log("picker selection: " + picker.selectedIndex);
		
		this.selectedIndex = picker.selectedIndex;
		console.log(this.rovers[this.selectedIndex]);
    }

	goToPhotos() {
		console.log("goToPhotos");
		this._router.navigate(["/rovers/rover"], {
            replaceUrl: false,
            queryParams: {
				rover: this.rovers[this.selectedIndex].toLowerCase(),
				day: this.day,
				month: this.month,
				year: this.year
            }
        });
	}

	onListickerLoaded(args) { 
		let listPicker = <ListPicker>args.object;
		listPicker.selectedIndex = 1;
	}

	onDatePickerLoaded(args) {
        let datePicker = <DatePicker>args.object;

		// TODO: intial values for picker date and for the queryParams
		datePicker.year = 2017; 
		this.year = datePicker.year;
		datePicker.month = 6; 
		this.month = datePicker.month;
		datePicker.day = 2; 
		this.day = datePicker.day;

		// TODO: different min and max dates for different rovers
        datePicker.minDate = new Date(2008, 0, 29);
        datePicker.maxDate = new Date();
    }

    onDayChanged(args) {
		this.day = args.value;
    }

    onMonthChanged(args) {
		this.month = args.value;
    }

    onYearChanged(args) {
		this.year = args.value;
    }
}