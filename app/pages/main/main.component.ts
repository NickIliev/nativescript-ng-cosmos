import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-telerik-ui-pro/sidedrawer';

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./main.component.html",
    styleUrls: ['main.component.css']
})
export class MainComponent {

    private _mainContentText: string;
    
        constructor(private _changeDetectionRef: ChangeDetectorRef) {
        }
    
        @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
        private drawer: RadSideDrawer;
    
        ngAfterViewInit() {
            this.drawer = this.drawerComponent.sideDrawer;
            this._changeDetectionRef.detectChanges();
        }
    
        ngOnInit() {
            this.mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";
        }
    
        get mainContentText() {
            return this._mainContentText;
        }
    
        set mainContentText(value: string) {
            this._mainContentText = value;
        }
    
        public openDrawer() {
            this.drawer.showDrawer();
        }
    
        public onCloseDrawerTap() {
           this.drawer.closeDrawer();
        }
}
