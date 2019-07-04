import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";

@Injectable()
export class HubbleService {
    API_URL: string;
    RELEASE_URL: string;

    constructor(private _http: HttpClient) {
        this.API_URL = "https://hubblesite.org/api/v3/news";
        this.RELEASE_URL = "https://hubblesite.org/news_release/news/";
    }

    getRelease(releaseUrl: string) {
        return this._http.get(releaseUrl)
                .pipe(map(data => {
                    return data;
                }));
    }

    getNews() {
        return this._http.get(this.API_URL)
            .pipe(map(data => {
                return data;
            }));
    }
}
