import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { MainComponent } from "./pages/main/main.component";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
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
    },
    {
        path: "asteroids",
        loadChildren: "./pages/asteroids/asteroids.module#AsteroidsModule"
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
