import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { RoverPhotosService } from "../../services/rover.service";
import { RoversComponent } from "./rovers.component";

export const routerConfig = [
    {
        path: "",
        component: RoversComponent
    }
]

@NgModule({
    imports: [
        NativeScriptUIListViewModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routerConfig)
    ],
    declarations: [RoversComponent],
    providers: [RoverPhotosService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RoversModule {
    constructor() { }
}