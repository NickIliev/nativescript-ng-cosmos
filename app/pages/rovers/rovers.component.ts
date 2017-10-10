
import { Page } from "ui/page";
import { Component, OnInit } from "@angular/core";
import { RoverPhoto } from "../../models/rover-model";
import { RoverPhotosService } from "../../services/rover.service";

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
            .subscribe((result) => {
                // create UI with logic for three different rovers, for different dates and paging
                console.log(result["photos"].lenght);
                
            }, (error) => {
                console.log(error);
            });
    }
}