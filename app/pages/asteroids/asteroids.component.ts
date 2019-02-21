
import { shareText } from "nativescript-social-share";
import { isAndroid } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { Observable as RxObservable } from "rxjs";
import { map } from "rxjs/operators";
import { AsteroidItem, AsteroidsApiData } from "../../models//asteroids-model";
import { AsteroidsService } from "../../services/asteroids.service";
import { Component } from "@angular/core";
import { on, orientationChangedEvent, OrientationChangedEventData } from "tns-core-modules/application";

@Component({
    selector: "cosmos-asteroids",
    moduleId: module.id,
    templateUrl: "./asteroids.component.html",
    styleUrls: ["./asteroids.component.css"]
})
export class AsteroidsComponent {

    isPortrait: boolean = false;

    asteroidItems: RxObservable<Array<AsteroidItem>>;
    asteroidCount: number;
    pageTitle: string;
    isAscending: boolean; // TODO implement different flag for complex sorting
    isSizeAscending: boolean;

    private _tempArr: Array<AsteroidItem> = [];
    private _subscr: any;

    constructor(
        private _page: Page,
        private _asteroidsService: AsteroidsService
    ) {
        if (isAndroid) {
            this._page.actionBarHidden = true;
        }

        on(orientationChangedEvent, (args: OrientationChangedEventData) => {
            let orientation = args.newValue;
            console.log(`orientation ${orientation}`);
            if (orientation === "portrait") {
                this.isPortrait = true;
            } else {
                this.isPortrait = false;
            }
        });

        this.asteroidCount = 0;
        this.pageTitle = "Nearby ASTEROIDS Checker";
        this.isAscending = false; // Used for proximity sort
        this.isSizeAscending = false;

        this._asteroidsService.getAsteroidsData().subscribe(
            (result: AsteroidsApiData) => {
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

                            newAsteroid.close_approach_data[0].relative_velocity.kilometers_per_hour = parseInt(
                                asteroid.close_approach_data[0]
                                    .relative_velocity.kilometers_per_hour
                            );
                            newAsteroid.close_approach_data[0].miss_distance.kilometers = parseInt(
                                asteroid.close_approach_data[0].miss_distance
                                    .kilometers
                            );

                            this._tempArr.push(newAsteroid);
                        });
                    }
                }

                this.asteroidItems = RxObservable.create(subscriber => {
                    this._subscr = subscriber;
                    subscriber.next(this._tempArr);
                });
            },
            error => {
                if (error.status >= 500) {
                    alert("Service temporary down!");
                    console.log("Service temporary DOWN!");
                }
            }
        );
    }

    sortByProximity() {
        if (this.isAscending) {
            this.isAscending = false;
            this.sortProximityDescending();
        } else {
            this.isAscending = true;
            this.sortProximityAscending();
        }
    }

    sortBySize() {
        if (this.isSizeAscending) {
            this.isSizeAscending = false;
            this.sortSizeDescending();
        } else {
            this.isSizeAscending = true;
            this.sortSizeAscending();
        }
    }

    sortByDanger() {
        if (this.isAscending) {
            this.isAscending = false;
            this.sortDangerDescending();
        } else {
            this.isAscending = true;
            this.sortDangerAscending();
        }
    }

    sortDangerAscending() {
        //  IMPORTNAT: TheN NASA API is providng the kilometers as a string value!!!
        // FIX the above so tht the sorting would work as expected!!!
        this.asteroidItems.forEach(arr => {
            arr.sort((a, b) => {
                return a.is_potentially_hazardous_asteroid <
                    b.is_potentially_hazardous_asteroid
                    ? 1
                    : -1;
            });
        });
    }

    sortDangerDescending() {
        this.asteroidItems.forEach(arr => {
            arr.sort((a, b) => {
                return a.is_potentially_hazardous_asteroid <
                    b.is_potentially_hazardous_asteroid
                    ? -1
                    : 1;
            });
        });
    }

    sortSizeAscending() {
        //  IMPORTNAT: TheN NASA API is providng the kilometers as a string value!!!
        // FIX the above so tht the sorting would work as expected!!!
        this.asteroidItems.forEach(arr => {
            arr.sort((a, b) => {
                return a.estimated_diameter.meters.estimated_diameter_max <
                    b.estimated_diameter.meters.estimated_diameter_max
                    ? 1
                    : -1;
            });
        });
    }

    sortSizeDescending() {
        this.asteroidItems.forEach(arr => {
            arr.sort((a, b) => {
                return a.estimated_diameter.meters.estimated_diameter_max <
                    b.estimated_diameter.meters.estimated_diameter_max
                    ? -1
                    : 1;
            });
        });
    }

    sortProximityAscending() {
        //  IMPORTNAT: TheN NASA API is providng the kilometers as a string value!!!
        // FIX the above so tht the sorting would work as expected!!!
        this.asteroidItems.forEach(arr => {
            arr.sort((a, b) => {
                return a.close_approach_data[0].miss_distance.kilometers <
                    b.close_approach_data[0].miss_distance.kilometers
                    ? 1
                    : -1;
            });
        });
    }

    sortProximityDescending() {
        this.asteroidItems.forEach(arr => {
            arr.sort((a, b) => {
                return a.close_approach_data[0].miss_distance.kilometers <
                    b.close_approach_data[0].miss_distance.kilometers
                    ? -1
                    : 1;
            });
        });
    }

    onShare(index) {

        console.log("onShare index: ", index);
        console.log(this._tempArr[index]);
        // TODO - form the share content to be meaningful
        // TODO UI and UX for share buttongit
        // TODO create iOS logic
        shareText(
            "Asteroid " +
                this._tempArr[index].name +
                " (Approx. size: "
                + this._tempArr[index].estimated_diameter.kilometers.estimated_diameter_max.toFixed(2) + "km)" +
                " in close proximity with Earth on " +
                this._tempArr[
                    index
                ].close_approach_data[0].close_approach_date.toString() +
                ". Reported by 'Cosmos Databank' for Android",
            "Asteriod Proximity Alert!"
        );
    }

    isAstreroidLarge(sizeKm) {
        return sizeKm > 0.5;
    }

    isAstreroidSmall(sizeKm) {
        return sizeKm <= 0.5;
    }
}
