import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { shareImage } from "nativescript-social-share";
import { confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";
import { fromUrl } from "tns-core-modules/image-source";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid } from "tns-core-modules/platform";

import { RoverPhoto } from "../../models/rover-model";
import { ToolbarHelper } from "../../shared/toolbar-helper";

@Component({
    selector: "cosmos-details",
    moduleId: module.id,
    templateUrl: "./photo-detail.component.html",
    styleUrls: ["./photo-detail.component.css"]
})
export class PhotoDetailComponent implements OnInit {

    photo: RoverPhoto;

    constructor(private _route: ActivatedRoute, private _page: Page, private _toolbarHelper: ToolbarHelper) {
        if (isAndroid) {
            this._page.actionBarHidden = true;
        }
    }

    ngOnInit(): void {
        if (this._route.snapshot.queryParams) {
            const query = this._route.snapshot.queryParams;

            this.photo = new RoverPhoto(
                query.id,
                query.sol,
                query.cameraId,
                query.cameraName,
                query.cameRoverId,
                query.cameraFullName,
                query.imageUri,
                query.earthDate
            );
        }
    }

    onNotify(message: string) {
        if (message === "onShare") {
            fromUrl(this.photo.imageUri).then(image => {
                shareImage(image);
            });
        } else if (message === "onSetWallpaper") {
            if (isAndroid) {
                let options: ConfirmOptions = {
                    message: "Set as Wallpaper?",
                    okButtonText: "Yes",
                    cancelButtonText: "No",
                    neutralButtonText: "Cancel"
                };
                confirm(options).then((result: boolean) => {
                    // result can be true/false/undefined
                    if (result) {
                        this._toolbarHelper.onSetWallpaper(this.photo.imageUri);
                    } else {
                        return;
                    }
                });
            }
        } else if (message === "onSaveFile") {
            console.log("onSaveFile not implemented!");
        }
    }
}

// } else if (message === "onSaveFile") {
//     let options: ConfirmOptions = {
//         title: "Image Downloaded!",
//         message: "Saved in /Pictures/CosmosDatabank",
//         okButtonText: "OK"
//     };
//     alert(options).then(() => {
//         this.toolbarHelper.onSaveFile(this.item);
//     });
// }
