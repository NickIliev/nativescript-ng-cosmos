import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AsteroidItem,  AsteroidsApiData, AsteroidsOnDate } from "../models/asteroids-model";
import "rxjs/add/operator/map";

const API_URL = "https://api.nasa.gov/neo/rest/v1/feed";
const API_KEY = "&" + "api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX";

@Injectable()
export class AsteroidsService {
    public rover: string;
    public year: number;
    public month: number;
    public day: number;
    public requestedURL: string;

    constructor(private http: Http) { }

    getAsteroidsData() {
        return this.http.get(this.getUpdatedUrl())
            .map(res => res.json())
            .map(data => {
                let apiData: AsteroidsApiData = new AsteroidsApiData(data.links, data.element_count, data.near_earth_objects);
                // console.log("apiData.element_count: " + apiData.element_count);
                return apiData;
            })
    }


    getUpdatedUrl() {
        var today = new Date();
        var requiredDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        var dateRange = "?start_date=" + this.formatDate(today) + "&end_date=" + this.formatDate(requiredDate);
        return API_URL + dateRange + API_KEY;
    }

    private formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = "0" + month;
        }
        if (day.length < 2) {
            day = "0" + day;
        }

        return [year, month, day].join("-");
    }
}