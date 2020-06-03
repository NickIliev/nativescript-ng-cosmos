/* Angular */
import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

/* NativeScript MOdules */
import { isAndroid } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import {
    SegmentedBar,
    SegmentedBarItem
} from "tns-core-modules/ui/segmented-bar";

/* Shared */
import { RoverPhotosService } from "../../../services/rover.service";

@Component({
    selector: "cosmos-pickers",
    moduleId: module.id,
    templateUrl: "./pickers.component.html",
    styleUrls: ["./pickers.component.css"]
})
export class PickersComponent {
    rovers: Array<string>;
    selectedRover: string;
    desc: string = "";
    allowedRange: string = "";
    manifest_obj: any;

    curiosity_obj = {};
    opportunity_obj = {};
    spirit_obj = {};

    private _today: Date;
    private _day: number;
    private _month: number;
    private _year: number;
    private _selectedIndex: number;

    private _datePicker: DatePicker;
    private _stackList: StackLayout;
    private _stackDate: StackLayout;
    private _segbar: SegmentedBar;

    public mySegmentedBarItems: Array<SegmentedBarItem>;

    constructor(private _page: Page, private _router: RouterExtensions, private _roverService: RoverPhotosService) {
        this._today = new Date(); // temp

        this._year = this._today.getFullYear();
        this._month = this._today.getMonth();
        this._day = this._today.getDay();

        this._roverService.getCuriosityManifest().subscribe(manifest => {
            this.curiosity_obj = manifest;
            this.manifest_obj = this.curiosity_obj;

            const date = new Date(this.manifest_obj.photo_manifest.max_date); // last known date with photos (Curiosity)
            this._today = date;

            this.adjustDatePickerForSelectedRover(this._today); // initial date set to max_date (last known date with photos)
        })

        this._roverService.getOpportunityManifest().subscribe(manifest => {
            this.opportunity_obj = manifest;
        })

        this._roverService.getSpiritManifest().subscribe(manifest => {
            this.spirit_obj = manifest;
        })


        this.mySegmentedBarItems = [];
        for (let i = 0; i < 3; i++) {
            const item = new SegmentedBarItem();
            if (i === 0) {
                item.title = "Curiosity";
            } else if (i === 1) {
                item.title = "Opportunity";
            } else if (i === 2) {
                item.title = "Spirit";
            }
            this.mySegmentedBarItems.push(item);
        }

        if (isAndroid) {
            this._page.actionBarHidden = true;

            // bug with DatePicker on API17 is preventing setting dates after in/max date has been already set
            // as only Spirit rover is requiring to change the min-max date
            // out of range the temp solution is to remove Spirit
            if (android.os.Build.VERSION.SDK_INT > 21) {
                this.rovers = ["Curiosity", "Opportunity", "Spirit"];
            } else {
                this.rovers = ["Curiosity", "Opportunity"];
            }
        } else {
            // iOS
            this.rovers = ["Curiosity", "Opportunity", "Spirit"];
        }
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

        // remember the chosen date & rover on navigation backwards
        this.selectedRover = this.rovers[this._selectedIndex].toLowerCase();
        // console.log(`this._year ${this._year}, this._month - 1 ${this._month - 1}, this._day + 1 ${this._day + 1}`)
        this._today = new Date(this._year, this._month - 1, this._day + 1); // e.g. new Date(2018, 4 + 1, 9);
        // console.log(`goToPhotos this.selectedRover ${this.selectedRover}`); // TODO use this to change the default loaded rover
        // console.log(`goToPhotos this_today: ${this._today}`);
    }

    onStackListLoaded(args) {
        this._stackList = args.object;
    }

    onStackDateLoaded(args, ...settings) {
        this._stackDate = args.object;

        let orig = settings[0];
        let enlarge = settings[1];
        // tslint:disable-next-line
        let dur = settings[2] | 300;

        this._stackList
            .animate({ scale: { x: enlarge, y: enlarge }, duration: dur })
            .then(() => {
                return this._stackList.animate({
                    scale: { x: orig, y: orig },
                    duration: dur
                });
            })
            .then(() => {
                return this._stackDate.animate({
                    scale: { x: enlarge, y: enlarge },
                    duration: dur
                });
            })
            .then(() => {
                return this._stackDate.animate({
                    scale: { x: orig, y: orig },
                    duration: dur
                });
            });
    }

    /* SegmentedBar logic START */
    onSegmentedbarLoaded(args) {
        this._segbar = args.object as SegmentedBar;
        // this._segbar.selectedIndex = 1;
    }

    onSelectedIndexChange(args) {
        let segbar = <SegmentedBar>args.object;
        this._selectedIndex = segbar.selectedIndex;
        this.selectedRover = this.rovers[this._selectedIndex];

        this.adjustDatePickerForSelectedRover(this._today);
    }
    /* SegmentedBar logic END */

    /* DatePicker logic START */
    onDatePickerLoaded(args) {
        this._datePicker = args.object as DatePicker;
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
        if (this.selectedRover && this._datePicker) {
            switch (this.selectedRover.toLowerCase()) {
                case "opportunity":
                    this.desc = " Opportunity (MER-B), Mars Exploration Rover, launched on July 7, 2003 and landed on January 25, 2004. Opportunity surpassed the previous records for longevity at 5,352 sols (5498 Earth days from landing to mission end; 15 Earth years or 8 Martian years) and covered a total distance of 40.25 km (25.01 mi). The rover sent its last status on 10 June 2018 when a global 2018 Mars dust storm blocked the sunlight needed to recharge its batteries. After hundreds of attempts to reactivate the rover, NASA declared the mission complete on February 13, 2019.";
                    
                    this.manifest_obj = this.opportunity_obj;

                    this._datePicker.minDate = new Date(2004, 0, 26);
                    this._datePicker.maxDate = new Date(this.manifest_obj.photo_manifest.max_date);
                    this._datePicker.date = new Date(this.manifest_obj.photo_manifest.max_date); // initial and max allowed date (where photos actually exists)
                    break;
                case "curiosity":
                    this.desc = "Curiosity of the Mars Science Laboratory (MSL) mission by NASA, was launched November 26, 2011 and landed at the Aeolis Palus plain near Aeolis Mons (informally 'Mount Sharp') in Gale Crater on August 6, 2012. The Curiosity rover is still operational as of July 23, 2019.";
                    
                    this.manifest_obj = this.curiosity_obj;

                    this._datePicker.minDate = new Date(2004, 0, 26);
                    this._datePicker.maxDate = new Date(this.manifest_obj.photo_manifest.max_date);
                    this._datePicker.date = new Date(this.manifest_obj.photo_manifest.max_date); // initial and max allowed date (where photos actually exists)
                    break;
                case "spirit":
                    this.desc = "Spirit (MER-A), Mars Exploration Rover, launched on June 10, 2003, and landed on January 4, 2004. Nearly 6 years after the original mission limit, Spirit had covered a total distance of 7.73 km (4.80 mi) but its wheels became trapped in sand. The last communication received from the rover was on March 22, 2010, and NASA ceased attempts to re-establish communication on May 25, 2011.";
                    
                    this.manifest_obj = this.spirit_obj;

                    this._datePicker.minDate = new Date(2004, 0, 26);
                    this._datePicker.maxDate = new Date(this.manifest_obj.photo_manifest.max_date);
                    this._datePicker.date = new Date(this.manifest_obj.photo_manifest.max_date); // initial and max allowed date (where photos actually exists)
                    break;
                default:
                    break;
            }
        }
    }
}
