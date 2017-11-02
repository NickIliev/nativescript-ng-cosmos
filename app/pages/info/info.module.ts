import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { InfoComponent } from "./info.component";

export const routerConfig = [
    {
        path: "",
        component: InfoComponent
    }
]

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routerConfig)
    ],
    declarations: [InfoComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class InfoModule {
    constructor() { }
}