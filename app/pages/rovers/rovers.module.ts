import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CommonModule } from '@angular/common';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";  // use only if the lazy loaded module uses ListView
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
        CommonModule,
        NativeScriptModule,
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