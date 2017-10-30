import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AsteroidsComponent } from "./asteroids.component";
import { AsteroidsService } from "../../services/asteroids.service";

export const routerConfig = [
    {
        path: "",
        component: AsteroidsComponent
    }
]

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routerConfig)
    ],
    declarations: [AsteroidsComponent],
    providers: [AsteroidsService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AsteroidsModule { }