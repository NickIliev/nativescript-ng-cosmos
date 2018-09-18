import {
    GestureEventData,
    PinchGestureEventData,
    PanGestureEventData
} from "tns-core-modules/ui/gestures";
import { View } from "tns-core-modules/ui/core/view";

export function onPan(
    args: PanGestureEventData,
    prevDeltaX: number,
    prevDeltaY: number,
    viewItem: View
) {
    if (args.state === 1) {
        prevDeltaX = 0;
        prevDeltaY = 0;
    } else if (args.state === 2) {
        viewItem.translateX += args.deltaX - prevDeltaX;
        viewItem.translateY += args.deltaY - prevDeltaY;

        prevDeltaX = args.deltaX;
        prevDeltaY = args.deltaY;
    }
}

export function onPinch(
    args: PinchGestureEventData,
    viewItem: View,
    startScale: number
) {
    if (args.state === 1) {
        const newOriginX = args.getFocusX() - viewItem.translateX;
        const newOriginY = args.getFocusY() - viewItem.translateY;

        const oldOriginX = viewItem.originX * viewItem.getMeasuredWidth();
        const oldOriginY = viewItem.originY * viewItem.getMeasuredHeight();

        viewItem.translateX +=
            (oldOriginX - newOriginX) * (1 - viewItem.scaleX);
        viewItem.translateY +=
            (oldOriginY - newOriginY) * (1 - viewItem.scaleY);

        viewItem.originX = newOriginX / viewItem.getMeasuredWidth();
        viewItem.originY = newOriginY / viewItem.getMeasuredHeight();

        startScale = viewItem.scaleX;
    } else if (args.scale && args.scale !== 1) {
        let newScale = startScale * args.scale;
        newScale = Math.min(8, newScale);
        newScale = Math.max(0.125, newScale);

        viewItem.scaleX = newScale;
        viewItem.scaleY = newScale;
    }
}

export function onDoubleTap(args: GestureEventData, viewItem: View) {
    console.log("DOUBLETAP");

    viewItem.animate({
        translate: { x: 0, y: 0 },
        scale: { x: 1, y: 1 },
        curve: "easeOut",
        duration: 300
    });
}
