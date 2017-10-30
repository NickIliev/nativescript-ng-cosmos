import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { RoverPhotosService } from "../../services/rover.service";
import { RoversComponent } from "./rovers.component";
import { PhotoDetailComponent } from "./photo-detail.component";

export const routerConfig = [
    {
        path: "", 
        component: RoversComponent
    },
    { path: "photo", component: PhotoDetailComponent },
]

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routerConfig)
    ],
    declarations: [RoversComponent, PhotoDetailComponent],
    providers: [RoverPhotosService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RoversModule {
    constructor() { }
}