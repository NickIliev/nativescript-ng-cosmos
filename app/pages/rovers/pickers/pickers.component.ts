import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { isAndroid } from "tns-core-modules/platform";
import { translateViewByXandYwithDurationAndCurve } from "../../../shared/animations-helper";

@Component({
	selector: 'pickers',
	moduleId: module.id,
	templateUrl: './pickers.component.html',
	styleUrls: ['./pickers.component.css']
})

export class PickersComponent {

	public rovers: Array<string> = ["Opportunity", "Curiosity", "Spirit"];;
	private _today: Date = new Date();
	private _day: number;
	private _month: number;
	private _year: number;
	private _selectedIndex: number;
	private _selectedRover: string;

	@ViewChild("dp") dp: ElementRef;
	private _datePicker: DatePicker;

	constructor(private _page: Page, private _router: RouterExtensions) {
		if (isAndroid) {
			this._page.actionBarHidden = true;
		}
	}

	ngAfterViewInit() {
		this._datePicker = <DatePicker>this.dp.nativeElement;
	}

	goToPhotos() {
		this._router.navigate(["/rovers/rover"], {
			replaceUrl: false,
			queryParams: {
				rover: this.rovers[this._selectedIndex].toLowerCase(),
				day: this._day,
				month: this._month,
				year: this._year
			}
		});
	}
	/* LISTPicker logic START */
	onListickerLoaded(args) {
		let listPicker = <ListPicker>args.object;
		listPicker.selectedIndex = 1;

		listPicker.animate({ scale: { x: 1.3, y: 1.3 }, duration: 300 })
			.then(() => { return listPicker.animate({ scale: { x: 1, y: 1 }, duration: 300 }); })
			.then(() => { return this._datePicker.animate({ scale: { x: 1.3, y: 1.3 }, duration: 300 }); })
			.then(() => { return this._datePicker.animate({ scale: { x: 1, y: 1 }, duration: 300 }); })
	}

	selectedIndexChanged(args) {
		let picker = <ListPicker>args.object;
		this._selectedIndex = picker.selectedIndex;
		this._selectedRover = this.rovers[this._selectedIndex];

		this.adjustDatePickerForSelectedRover(this._today);
	}
	/* LISTPicker logic END */

	/* DatePicker logic START */
	onDatePickerLoaded(args) {
		if (this._datePicker) {
			this.adjustDatePickerForSelectedRover(this._today);
		} else {
			this._datePicker = <DatePicker>args.object;
			this.adjustDatePickerForSelectedRover(this._today);
		}
	}

	onDayChanged(args) {
		this._day = args.value;
	}

	onMonthChanged(args) {
		this._month = args.value;
	}

	onYearChanged(args) {
		this._year = args.value;
	}
	/* DatePicker logic END */

	private adjustDatePickerForSelectedRover(today: Date) {

		if (this._selectedRover) {
			switch (this._selectedRover.toLowerCase()) {
				case "opportunity":
					this._datePicker.minDate = new Date(2004, 0, 26);
					this._datePicker.maxDate = today;

					// intial values for picker date and for the queryParams
					this._datePicker.year = today.getUTCFullYear();
					this._year = this._datePicker.year;
					this._datePicker.month = today.getUTCMonth() + 1;
					this._month = this._datePicker.month;
					this._datePicker.day = today.getUTCDate();
					this._day = this._datePicker.day;
					break;
				case "curiosity":
					this._datePicker.minDate = new Date(2012, 6 + 1, 6);
					this._datePicker.maxDate = today;

					this._datePicker.year = today.getUTCFullYear();
					this._year = this._datePicker.year;
					this._datePicker.month = today.getUTCMonth() + 1;
					this._month = this._datePicker.month;
					this._datePicker.day = today.getUTCDate();
					this._day = this._datePicker.day;
					break;
				case "spirit":
					this._datePicker.minDate = new Date(2004, 0, 5);
					this._datePicker.maxDate = new Date(2010, 1 + 1, 21);

					this._datePicker.year = 2008;
					this._year = this._datePicker.year;
					this._datePicker.month = 6;
					this._month = this._datePicker.month;
					this._datePicker.day = 2;
					this._day = this._datePicker.day;
					break;
				default:
					break;
			}
		}
	}
}