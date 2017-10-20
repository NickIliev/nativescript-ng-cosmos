import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { NativeScriptModule } from "nativescript-angular/nativescript.module";  // use only if the lazy loaded module uses ListView
=======

import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
>>>>>>> dc9e39c787ff7f3ab1f6e78f158af99a76a1a975

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
        CommonModule,
        NativeScriptModule,
<<<<<<< HEAD
=======
        NativeScriptUIListViewModule,
>>>>>>> dc9e39c787ff7f3ab1f6e78f158af99a76a1a975
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