import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class AppService {
    pageTransition: string;
    duration: number;

    /*
    Using BehaviorSubject to pass data between unrelated components
    https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/#Unrelated-Components-Sharing-Data-with-a-Service
    */
    private authenticationSource = new BehaviorSubject(false);
    currentState = this.authenticationSource.asObservable();

    constructor() {
        this.pageTransition = "fade";
        this.duration = 300;
    }

    changeAuthState(isLogged: boolean) {
        this.authenticationSource.next(isLogged);
    }
}
