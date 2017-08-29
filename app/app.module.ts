import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { ApodService } from "./services/apod.service";

import { ApodComponent } from "./pages/apod/apod.component";
import { InfoComponent } from "./pages/info/info.component";
import { MainComponent } from "./pages/main/main.component";

import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-telerik-ui-pro/listview/angular";

import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule, NSModuleFactoryLoader } from "nativescript-angular/router";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        AppComponent,
        InfoComponent,
        MainComponent
    ],
    providers: [
        ApodService,
        [{ provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }]
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
