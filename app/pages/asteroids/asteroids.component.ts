import { Component } from "@angular/core";
import { shareText } from "nativescript-social-share";
import { isAndroid } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { Observable as RxObservable } from "rxjs";

import { AsteroidItem, AsteroidsApiData } from "../../models//asteroids-model";
import { AsteroidsService } from "../../services/asteroids.service";

@Component({
    selector: "ns-asteroids",
    moduleId: module.id,
    templateUrl: "./asteroids.component.html",
    styleUrls: ["./asteroids.component.css"]
})

export class AsteroidsComponent {
    public asteroidItems: RxObservable<Array<AsteroidItem>>;
    public asteroidCount: number;

    private _tempArr: Array<AsteroidItem> = [];
    private _subscr: any;

    constructor(private _page: Page, private _asteroidsService: AsteroidsService) {
        if (isAndroid) {
            this._page.actionBarHidden = true;
        }

        this.asteroidCount = 0;
        this._asteroidsService.getAsteroidsData()
            .subscribe((result: AsteroidsApiData) => {

                this.asteroidCount = result.element_count;
                // for each date in the seven days period ahead..
                for (let key in result.near_earth_objects) {
                    if (result.near_earth_objects.hasOwnProperty(key)) {
                        let date = result.near_earth_objects[key];

                        // itterate the array of asteroids on each date
                        date.forEach(asteroid => {
                            let newAsteroid = new AsteroidItem(
                                asteroid.links,
                                asteroid.neo_reference_id,
                                asteroid.name,
                                asteroid.nasa_jpl_url,
                                asteroid.absolute_magnitude_h,
                                asteroid.estimated_diameter,
                                asteroid.is_potentially_hazardous_asteroid,
                                asteroid.close_approach_data
                            );

                            this._tempArr.push(newAsteroid);
                        });
                    }
                }

                this.asteroidItems = RxObservable.create(subscriber => {
                    this._subscr = subscriber;
                    subscriber.next(this._tempArr);
                });
            }, error => {
                // console.log(error);
                if (error.status >= 500) {
                    console.log("Service temporary DOWN!");
                }
            });
    }

    onShare(index) {
        // TODO - form the share content to be meaningful
        // TODO UI and UX for share buttongit
        // TODO create iOS logic
        shareText(
            "Asteroid " +
            this._tempArr[index].name +
            " in close proximity with Earth on " +
            this._tempArr[index].close_approach_data[0].close_approach_date.toString() +
            ". Reported by 'Cosmos Databank' for Android", "Asteriod Proximity Alert!");
    }

    isAstreroidLarge(sizeKm) {
        return sizeKm > 0.5;
    }

    isAstreroidSmall(sizeKm) {
        return sizeKm <= 0.5;
    }
}
