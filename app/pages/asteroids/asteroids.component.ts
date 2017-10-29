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
    styleUrls:["./asteroids.component.css"]
})
export class AsteroidsComponent {
    public asteroidItems: RxObservable<Array<AsteroidItem>>;
    private tempArr: Array<AsteroidItem> = [];

    public asteroidCount: number = 0;
    public isAndroid: boolean;
    private subscr;

    constructor(private _page: Page, private _asteroidsService: AsteroidsService) { 
        if (isAndroid) {
            this._page.actionBarHidden = true;
        }

        this.isAndroid = isAndroid;

        this._asteroidsService.getAsteroidsData().subscribe((result) => { 
            
            this.asteroidCount = result.element_count;

            // foe each date in the seven days period ahead..
            for (var key in result.near_earth_objects) {
                if (result.near_earth_objects.hasOwnProperty(key)) {
                    var date = result.near_earth_objects[key];

                    // itterate all the asteroids on each date
                    date.forEach(asteroid => {
                        let newAsteroid = new AsteroidItem(
                            asteroid.links, 
                            asteroid.neo_reference_id, 
                            asteroid.name, 
                            asteroid.nasa_jpl_url,
                            asteroid.absolute_magnitude_h,
                            asteroid.estimated_diameter,
                            asteroid.is_potentially_hazardous_asteroid,
                            asteroid.close_approach_data,
                            asteroid.orbital_data
                        );

                        this.tempArr.push(newAsteroid);
                    });
                }
            }

            this.asteroidItems = RxObservable.create(subscriber => {
                this.subscr = subscriber;
                subscriber.next(this.tempArr);
            });
            
        })
    }
}
