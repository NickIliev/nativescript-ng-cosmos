import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ApodService } from "../../services/apod.service";
import { ApodComponent } from "./apod.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { ToolbarHelper } from "../../shared/toolbar-helper";
import { registerElement } from "nativescript-angular/element-registry";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

registerElement(
    "circularProgressBar",
    () => require("ui/layouts/stack-layout").StackLayout
);

export const routerConfig = [
    {
        path: "",
        component: ApodComponent
    }
];

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routerConfig)
    ],
    declarations: [ApodComponent, ToolbarComponent],
    providers: [ApodService, ToolbarHelper],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ApodModule {}
