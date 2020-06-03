import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppCenter } from "nativescript-app-center";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { AppService } from "./app.service";
import { LoginComponent } from "./pages/login/login.component";
import { MainComponent } from "./pages/main/main.component";
import { ApodService } from "./services/apod.service";
import { appCenter } from "./shared/app-center-initializer";

import { EnvironmentManagerService } from "./services/environment.service"

registerElement("CardView", () => require("nativescript-cardview").CardView);

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [AppComponent, LoginComponent, MainComponent],
    providers: [ApodService, AppService, EnvironmentManagerService, { provide: AppCenter, useValue: appCenter }],
    schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
