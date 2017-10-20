import { Component } from "@angular/core";
import { isAndroid } from "platform";
import { Page } from "ui/page";

import { AsteroidItem,  AsteroidsOnDate } from "../../models//asteroids-model";
import { AsteroidsService } from "../../services/asteroids.service";
import { Observable as RxObservable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Component({
    selector: "ns-asteroids",
    moduleId: module.id,
    templateUrl: "./asteroids.component.html",
})
export class AsteroidsComponent {
    public asteroidItems: RxObservable<Array<AsteroidItem>>;
    private tempArr: Array<AsteroidItem> = [];

    public asteroidCount: number = 0;
    public url: string;

    constructor(private _page: Page, private _asteroidsService: AsteroidsService) { 
        if (isAndroid) {
            this._page.actionBarHidden = true;
        }

        this._asteroidsService.getAsteroidsData().map((result) => { 

            result.near_earth_objects.date.forEach(element => {
                console.dir(element);
            });
        })
    }
}
