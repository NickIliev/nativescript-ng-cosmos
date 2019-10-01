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
        loadChildren: () => import("./pages/info/info.module").then(m => m.InfoModule)
    },
    {
        path: "apod",
        loadChildren: () => import("./pages/apod/apod.module").then(m => m.ApodModule)
    },
    {
        path: "rovers",
        loadChildren: () => import("./pages/rovers/rovers.module").then(m => m.RoversModule)
    },
    {
        path: "asteroids",
        loadChildren: () => import("./pages/asteroids/asteroids.module").then(m => m.AsteroidsModule)
    },
    {
        path: "hubble",
        loadChildren: () => import("./pages/hubble/hubble.module").then(m => m.HubbleModule)
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
