import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ApodComponent } from "./apod.component";

export const routerConfig = [
    {
        path: "",
        component: ApodComponent
    }
]

@NgModule({
    imports: [
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routerConfig)
    ],
    declarations: [ApodComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ApodModule {
    constructor() { }
}