const firebase = require("nativescript-plugin-firebase");
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AppModule } from "./app.module";
import { android as androidApp, AndroidApplication, AndroidActivityBundleEventData } from "application";
import { ad } from "utils/utils";

declare let com: any;

if (androidApp) {
    const context = ad.getApplicationContext();

    androidApp.on(AndroidApplication.activityCreatedEvent, function (args: AndroidActivityBundleEventData) {
        let builder = new android.os.StrictMode.VmPolicy.Builder();
        android.os.StrictMode.setVmPolicy(builder.build());

        // Needed for corner cases with HTTP request using TSL on Android API19
        com.google.android.gms.security.ProviderInstaller.installIfNeededAsync(context, new com.google.android.gms.security.ProviderInstaller.ProviderInstallListener({
            onProviderInstalled: () => {
            },
            onProviderInstallFailed: (errorCode, intent) => {
            }
        }))
    });
}

platformNativeScriptDynamic().bootstrapModule(AppModule);
