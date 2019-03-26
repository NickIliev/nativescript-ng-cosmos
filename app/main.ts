// import "reflect-metadata"; // fixes https://github.com/NativeScript/nativescript-dev-webpack/issues/660

// The platformNativeScriptDynamic import should be before any @angular imports
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
import { initializeLoggers } from "./shared/app-center-initializer";

require("nativescript-plugin-firebase");

import {
    android as androidApp,
    AndroidApplication,
    AndroidActivityBundleEventData
} from "tns-core-modules/application";
import { ad } from "tns-core-modules/utils/utils";
import { enableProdMode } from "@angular/core";

declare let com: any;

if (androidApp) {
    const context = ad.getApplicationContext();

    androidApp.on(AndroidApplication.activityCreatedEvent, function (
        args: AndroidActivityBundleEventData
    ) {
        let builder = new android.os.StrictMode.VmPolicy.Builder();
        android.os.StrictMode.setVmPolicy(builder.build());

        // Needed for corner cases with HTTP request using TSL on Android API19
        com.google.android.gms.security.ProviderInstaller.installIfNeededAsync(
            context,
            new com.google.android.gms.security.ProviderInstaller.ProviderInstallListener(
                {
                    onProviderInstalled: () => {
                        // console.log("Provider Installed!");
                    },
                    onProviderInstallFailed: (errorCode, intent) => {
                        // console.log("Error: " + errorCode);
                    }
                }
            )
        );
    });
}

initializeLoggers();
enableProdMode();

platformNativeScriptDynamic().bootstrapModule(AppModule);
