import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AsteroidsComponent } from "./asteroids.component";
import { AsteroidsService } from "../../services/asteroids.service";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";  // use only if the lazy loaded module uses ListView

export const routerConfig = [
    {
        path: "",
        component: AsteroidsComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        NativeScriptModule,
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