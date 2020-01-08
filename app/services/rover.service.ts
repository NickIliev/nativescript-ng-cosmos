import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { RoverPhoto } from "../models/rover-model";
import { getApiKey } from "../shared/nasa-api";

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

    API_MANIFEST_CURIOSITY: any;
    API_MANIFEST_SPIRIT: any;
    API_MANIFEST_OPPORTUNITY: any;
    /*
    Mission Manifest

    A mission manifest is available for each Rover at /manifests/rover_name. 
    This manifest will list details of the Rover's mission to help narrow down photo queries to the API. 
    The information in the manifest includes:

        Key	Description
        name	        Name of the Rover
        landing_date	The Rover's landing date on Mars
        launch_date	    The Rover's launch date from Earth
        status	        The Rover's mission status
        max_sol	        The most recent Martian sol from which photos exist
        max_date	    The most recent Earth date from which photos exist
        total_photos	Number of photos taken by that Rover

    */

    constructor(private _http: HttpClient) {
        this.API_URL_START = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
        this.API_URL_DATE = "/photos?earth_date=";
        this.NASA_API_KEY = getApiKey();

        this.API_MANIFEST_CURIOSITY = "https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity?api_key=" + getApiKey();
        this.API_MANIFEST_SPIRIT = "https://api.nasa.gov/mars-photos/api/v1/manifests/Spirit?api_key=" + getApiKey();
        this.API_MANIFEST_OPPORTUNITY = "https://api.nasa.gov/mars-photos/api/v1/manifests/Opportunity?api_key=" + getApiKey();
    }

    getCuriosityManifest() {
        return this._http.get(this.API_MANIFEST_CURIOSITY)
            .pipe(map(data => {
                return data;
            }));
    }

    getOpportunityManifest() {
        return this._http.get(this.API_MANIFEST_OPPORTUNITY)
            .pipe(map(data => {
                return data;
            }));
    }

    getSpiritManifest() {
        return this._http.get(this.API_MANIFEST_SPIRIT)
            .pipe(map(data => {
                return data;
            }));
    }

    getPhotosWithDateAndPageIndex(rover: string, year: number, month: number, day: number, pageIndex: number) {
        return this._http.get(this.getUpdatedUrl(rover, year, month, day) + "&page=" + pageIndex)
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
