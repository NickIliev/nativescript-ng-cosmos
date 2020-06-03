import { Injectable } from '@angular/core';

declare var process: any;

@Injectable()
export class EnvironmentManagerService {
    private getEnvironmentVars(key: string): string {
        if (process.env) {
            return process.env[key];
        } else {
            return "";
        }
    }

    // public getGoogleMapsKey(): string {
    //     return this.getEnvironmentVars("gmapsKey");
    // }

    // public getStripePublishableKey(): string {
    //     return this.getEnvironmentVars("stripeKey");
    // }

    public isDev(): boolean {
        return this.getEnvironmentVars("envtype") === "dev";
    }

    
    public isProduction(): boolean {
        return this.getEnvironmentVars("envtype") !== "dev";
    }


    /*
    FOR EXAMPLE
        --env.envtype="dev" --env.gmapsKey="KEY_HERE" --env.stripeKey="KEY_HERE"
    */
}