import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RoverPhoto } from "../models/rover-model";
import { getApiKey } from "../shared/nasa-api";
import { map } from "rxjs/operators";

@Injectable()
export class RoverPhotosService {
    rover: string;
    year: number;
    month: number;
    day: number;
    requestedURL: string;

    NASA_API_KEY: string;
    API_URL_START: string;
    API_URL_DATE: string;

    constructor(private http: HttpClient) {
        this.API_URL_START = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
        this.API_URL_DATE = "/photos?earth_date=";
        this.NASA_API_KEY = getApiKey();
    }

    getPhotosWithDateAndPageIndex(rover: string, year: number, month: number, day: number, pageIndex: number) {
        return this.http.get(this.getUpdatedUrl(rover, year, month, day) + "&page=" + pageIndex)
            .pipe(map(data => {
                let itemsList = [];
                data["photos"].forEach((item) => {
                    itemsList.push(new RoverPhoto(
                        item.id,
                        item.sol,
                        item.camera.id,
                        item.camera.name,
                        item.camera.rover_id,
                        item.camera.full_name,
                        item.img_src,
                        item.earth_date));
                });
                return itemsList;
            }));
    }

    getUpdatedUrl(rover: string, year: number, month: number, day: number) {
        this.rover = rover;
        this.year = year;
        this.month = month;
        this.day = day;

        return this.requestedURL = this.API_URL_START
                                    + this.rover
                                    + this.API_URL_DATE
                                    + this.year + "-" + this.month + "-" + this.day
                                    + "&api_key=" + this.NASA_API_KEY;
    }
}
