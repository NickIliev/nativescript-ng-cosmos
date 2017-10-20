import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
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