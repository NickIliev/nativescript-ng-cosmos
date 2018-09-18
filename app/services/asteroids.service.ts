import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { AsteroidsApiData } from "../models/asteroids-model";
import { getApiKey } from "../shared/nasa-api";

@Injectable()
export class AsteroidsService {
  rover: string;
  year: number;
  month: number;
  day: number;
  requestedURL: string;
  API_URL: string;
  NASA_API_KEY: string;

  constructor(private _http: HttpClient) {
    // Retrieve a list of Asteroids based on their closest approach date to Earth. (start date - end date period)
    // https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY
    this.API_URL = "https://api.nasa.gov/neo/rest/v1/feed";
    this.NASA_API_KEY = getApiKey();
  }

  getAsteroidsData() {
    return this._http.get(this.getUpdatedUrl()).pipe(
      map(data => {
        let apiData: AsteroidsApiData = new AsteroidsApiData(
          data["links"],
          data["element_count"],
          data["near_earth_objects"]
        );
        return apiData;
      })
    );
  }

  getUpdatedUrl() {
    let today = new Date();
    let requiredDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7
    );
    let dateRange =
      "?start_date=" +
      this.formatDate(today) +
      "&end_date=" +
      this.formatDate(requiredDate);
    return this.API_URL + dateRange + "&api_key=" + this.NASA_API_KEY;
  }

  private formatDate(date) {
    let d = new Date(date),
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
