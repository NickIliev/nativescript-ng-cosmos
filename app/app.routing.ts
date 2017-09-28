import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ApodComponent } from "./pages/apod/apod.component";
import { InfoComponent } from "./pages/info/info.component";
import { MainComponent } from "./pages/main/main.component";

const routes: Routes = [
    { path: "", redirectTo: "/main", pathMatch: "full" },
    { path: "main", component: MainComponent },
    { 
        path: "info", 
        loadChildren: "./pages/info/info.module#InfoModule" 
    },
    {
        path: "apod",
        loadChildren: "./pages/apod/apod.module#ApodModule",
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }