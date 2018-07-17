import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApodService {

    constructor(private http: HttpClient) { }

    getData() {
        return this.http.get("https://api.nasa.gov/planetary/apod?api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX")
    }

    getDataWithCustomDate(date: string) {
        // For Example: date: string = "2017-07-25";
        const URL = "https://api.nasa.gov/planetary/apod?api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX&date=";
        return this.http.get(URL + date)
    }
}
