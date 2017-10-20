import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { RoverPhoto } from "../models/rover-model";
import "rxjs/add/operator/map";

const API_URL_START = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
const API_URL_DATE = "/photos?earth_date=";
const API_KEY = "&" + "api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX";

@Injectable()
export class RoverPhotosService {
    public rover: string;
    public year: number;
    public month: number;
    public day: number;
    public requestedURL: string;

    constructor(private http: Http) { }

    getPhotosWithDateAndPageIndex(pageIndex: number) {
        return this.http.get(this.getUpdatedUrl("curiosity", 2017, 6, 21) + "&page=" + pageIndex)
            .map(res => res.json())
            .map(data => {
                let itemsList = [];
                data.photos.forEach((item) => {
                    itemsList.push(new RoverPhoto(item.id, item.sol, item.camera.id, item.camera.name, item.camera.rover_id, item.camera.full_name, item.img_src, item.earth_date));
                });
                return itemsList;
            })
    }


    getUpdatedUrl(rover: string, year: number, month: number, day: number) {
        this.rover = rover;
        this.year = year;
        this.month = month;
        this.day = day;

        return this.requestedURL = API_URL_START
            + this.rover
            + API_URL_DATE
            + this.year + "-" + this.month + "-" + this.day
            + API_KEY;
    }
}