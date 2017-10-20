import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
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
    },
    { 
        path: "rovers", 
        loadChildren: "./pages/rovers/rovers.module#RoversModule" 
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }