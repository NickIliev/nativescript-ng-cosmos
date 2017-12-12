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

platformNativeScriptDynamic().bootstrapModule(AppModule);
