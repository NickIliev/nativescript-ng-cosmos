
import { Page } from "ui/page";
import { Component, OnInit } from "@angular/core";
import { RoverPhoto } from "../../models/rover-model";
import { RoverPhotosService } from "../../services/rover.service";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Component({
    selector: "rovers",
    moduleId: module.id,
    templateUrl: "./rovers.component.html"
})
export class RoversComponent {

    public roverPhotos: Array<RoverPhoto> = [];

    constructor(private roverService: RoverPhotosService) {
        this.extractData("2017-06-21", 1);
    }

    private extractData(date: string, pageIndex: number) {
        this.roverService.getPhotosWithDateAndPageIndex(pageIndex)
            .map(data => {
                let itemsList = [];
                data.photos.forEach((item) => {
                    console.log("item.id: " + item.id)
                    itemsList.push(new RoverPhoto(item.id, item.sol, item.camera.id, item.camera.name, item.camera.rover_id, item.camera.full_name, item.img_src, item.earth_date));

                });
                return itemsList;
            })
            .subscribe((itemsList) => {
                this.roverPhotos = itemsList;
                console.dir(this.roverPhotos[0]);
                console.dir(this.roverPhotos[2]);
            }, (error) => {
                console.log(error);
            });
        

            console.log("his.roverPhotos.length" + this.roverPhotos.length);
    }
}