import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

// import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { LoginComponent } from "./pages/login/login.component";
import { MainComponent } from "./pages/main/main.component";
import { ApodService } from "./services/apod.service";
import { LoginService } from "./services/login.service";

import { AppCenter } from "nativescript-app-center";
import { appCenter } from "./shared/app-center-initializer";

import { registerElement } from "nativescript-angular/element-registry";
registerElement("CardView", () => require("nativescript-cardview").CardView);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptRouterModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent
    ],
    providers: [
        ApodService,
        LoginService,
        {
            provide: AppCenter,
            useValue: appCenter
        }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
