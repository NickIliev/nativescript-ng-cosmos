import { Component, Output, EventEmitter } from '@angular/core';
import { Button } from "ui/button";

@Component({
    selector: 'rovers-toolbar',

    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})

export class RoversToolbarComponent {
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    onSaveFile() {
        this.notify.emit("onSaveFile");
    }

    onShare() {
        this.notify.emit("onShare");
    }

    onSetWallpaper() {
        this.notify.emit("onSetWallpaper");
    }
}