import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-telerik-ui-pro/sidedrawer';

import { ios, android } from "application";

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./main.component.html",
    styleUrls: ['main.component.css']
})
export class MainComponent {
    apodTitle: string;
    asteroidTitle: string;
    roversTitle: string;
    detailsTitle: string;
    
    public isAndroid: boolean;
    public isIos: boolean;

    constructor(private _changeDetectionRef: ChangeDetectorRef) {
        this.apodTitle = "Astronomical \nPhoto \nof the Day";
        this.asteroidTitle = "Asteroids\n Proximity\n Checker";
        this.roversTitle = "Mars Rovers\n Photos\n Databank";
        this.detailsTitle = "About\n Cosmos Databank\n Application";

        if (ios) {
            this.isAndroid = false;
            this.isIos = true;
        } else if (android) {
            this.isAndroid = true;
            this.isIos = false;
        }
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }
    
    public toggleDrawer() {
        this.drawer.toggleDrawerState();
    }
}
