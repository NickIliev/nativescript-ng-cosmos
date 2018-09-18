import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "cosmos-toolbar",
    moduleId: module.id,
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.css"]
})
export class ToolbarComponent {
    @Output()
    notify: EventEmitter<string> = new EventEmitter<string>();

    goToPrevousDay() {
        this.notify.emit("goToPrevousDay");
    }

    goToNextDay() {
        this.notify.emit("goToNextDay");
    }

    onSaveFile() {
        this.notify.emit("onSaveFile");
    }

    onShare() {
        this.notify.emit("onShare");
    }

    onSetWallpaper() {
        this.notify.emit("onSetWallpaper");
    }

    // setUserInteraction(shareButton: Button, saveButton: Button, desktopButton: Button, state: boolean) {
    //     shareButton.isUserInteractionEnabled = state;
    //     saveButton.isUserInteractionEnabled = state;
    //     desktopButton.isUserInteractionEnabled = state;
    // }

    // setButtonsOpacity(shareButton: Button, saveButton: Button, desktopButton: Button, value: number) {
    //     saveButton.opacity = value;
    //     desktopButton.opacity = value;
    //     shareButton.opacity = value;
    // }
}
