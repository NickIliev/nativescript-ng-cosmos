import { Injectable } from "@angular/core";
import { Http} from "@angular/http";

import { ApodItem } from "../models/apod-model";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";


@Injectable()
export class ApodService {
    private _item: ApodItem;
    
    constructor(private http: Http) { }

    getData() {
        return this.http.get("https://api.nasa.gov/planetary/apod?api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX")
                .map(res => res.json());
    }

    
    getDataWithCustomDate(date:string) { 
        // For Example: date: string = "2017-07-25";
        return this.http.get("https://api.nasa.gov/planetary/apod?api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX&date=" + date) 
                .map(res => res.json());
    }
}