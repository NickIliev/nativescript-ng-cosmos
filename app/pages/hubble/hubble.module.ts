import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { HubbleService } from "../../services/hubble.service";
import { HubbleComponent } from "./hubble.component";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

export const routerConfig = [
    {
        path: "",
        component: HubbleComponent
    }
];

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routerConfig)
    ],
    declarations: [HubbleComponent],
    providers: [HubbleService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HubbleModule {}
