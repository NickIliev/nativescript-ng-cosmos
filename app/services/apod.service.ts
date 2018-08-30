import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { getApiKey } from "../shared/nasa-api";

@Injectable()
export class ApodService {
    NASA_API_KEY: string;

    constructor(private http: HttpClient) { 
        this.NASA_API_KEY = getApiKey();
    }

    getData() {
        return this.http.get("https://api.nasa.gov/planetary/apod?api_key="  + this.NASA_API_KEY)
    }

    getDataWithCustomDate(date: string) {
        // For Example: date: string = "2017-07-25";
        const URL = "https://api.nasa.gov/planetary/apod?api_key=" + this.NASA_API_KEY + "&date=";
        return this.http.get(URL + date)
    }
}
