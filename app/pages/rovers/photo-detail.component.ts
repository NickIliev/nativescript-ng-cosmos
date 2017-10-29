import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { RoverPhoto } from "../../models/rover-model";
import { RoverPhotosService } from "../../services/rover.service";

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./photo-detail.component.html",
})
export class PhotoDetailComponent implements OnInit {
    item: RoverPhoto;

    constructor(
        private itemService: RoverPhotosService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params["id"];
        console.log("photo detaile page received ID: " + id);
        // this.item = this.itemService.getItem(id);
    }

    getItem(items: Array<RoverPhoto>, id: number): RoverPhoto {
        return items.filter(item => item.id === id)[0];
    }
}
