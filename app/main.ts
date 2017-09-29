// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
import { android as androidApp, AndroidApplication, AndroidActivityBundleEventData } from "application";

if (androidApp) {
    androidApp.on(AndroidApplication.activityCreatedEvent, function (args: AndroidActivityBundleEventData) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity + ", Bundle: " + args.bundle);

        let builder = new android.os.StrictMode.VmPolicy.Builder();
        android.os.StrictMode.setVmPolicy(builder.build());
    });
}
// A traditional NativeScript application starts by initializing global objects, setting up global CSS rules, creating, and navigating to the main page. 
// Angular applications need to take care of their own initialization: modules, components, directives, routes, DI providers. 
// A NativeScript Angular app needs to make both paradigms work together, so we provide a wrapper platform object, platformNativeScriptDynamic, 
// that sets up a NativeScript application and can bootstrap the Angular framework.
platformNativeScriptDynamic().bootstrapModule(AppModule);
