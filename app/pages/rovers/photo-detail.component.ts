import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { isAndroid } from "platform";
import { Page } from "ui/page";
import { RoverPhoto } from "../../models/rover-model";
import { ad } from "utils/utils";
import { fromUrl } from "image-source";
import { shareImage } from "nativescript-social-share";

@Component({
    selector: "ns-details",

    templateUrl: "./photo-detail.component.html"
})
export class PhotoDetailComponent implements OnInit {

    photo: RoverPhoto;

    constructor(private _route: ActivatedRoute, private _page: Page) {
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
            // console.log(`id: ${query['id']}`);
        }
    }

    onNotify(message: string) {
        if (message === "onShare") {
            fromUrl(this.photo.imageUri).then(image => {
                shareImage(image);
            })
        } else if (message === "onSetWallpaper") {
            if (isAndroid) {
                fromUrl(this.photo.imageUri).then(image => {
                    let wallpaperManager = android.app.WallpaperManager.getInstance(ad.getApplicationContext());
                    try {
                        wallpaperManager.setBitmap(image.android);
                    } catch (error) {
                        console.log(error);
                    }
                })
            }
        } else if (message === "onSaveFile") {
            console.log("onSaveFile not implemented!");
        }
    }
}
