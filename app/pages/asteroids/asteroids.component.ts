import { Component } from "@angular/core";
import { isAndroid } from "platform";
import { Page } from "ui/page";
import { shareText } from "nativescript-social-share";
import { AsteroidItem, AsteroidsOnDate, AsteroidsApiData } from "../../models//asteroids-model";
import { AsteroidsService } from "../../services/asteroids.service";
import { Observable as RxObservable } from "rxjs";

@Component({
    selector: "ns-asteroids",
    moduleId: module.id,
    templateUrl: "./asteroids.component.html",
    styleUrls: ["./asteroids.component.css"]
})

export class AsteroidsComponent {
    public asteroidItems: RxObservable<Array<AsteroidItem>>;
    private tempArr: Array<AsteroidItem> = [];

    public asteroidCount: number = 0;
    private subscr;

    constructor(private _page: Page, private _asteroidsService: AsteroidsService) {
        if (isAndroid) {
            this._page.actionBarHidden = true;
        }

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

                            this.tempArr.push(newAsteroid);
                        });
                    }
                }

                this.asteroidItems = RxObservable.create(subscriber => {
                    this.subscr = subscriber;
                    subscriber.next(this.tempArr);
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
            this.tempArr[index].name +
            " in close proximity with Earth on " +
            this.tempArr[index].close_approach_data[0].close_approach_date.toString() +
            ". Reported by 'Cosmos Databank' for Android", "Asteriod Proximity Alert!");
    }

    isAstreroidLarge(sizeKm) {
        return sizeKm > 0.5;
    }

    isAstreroidSmall(sizeKm) {
        return sizeKm <= 0.5;
    }
}
