import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./pages/item/items.component";
import { InfoComponent } from "./pages/info/info.component";

const routes: Routes = [
    { path: "", redirectTo: "/items", pathMatch: "full" },
    { path: "items", component: ItemsComponent },
    { path: "info", component: InfoComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }