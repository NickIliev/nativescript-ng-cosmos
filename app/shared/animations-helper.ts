export function translateViewByXandYwithDurationAndCurve(
    view,
    translateFromX,
    translateToX,
    translateFromY,
    translateToY,
    duration,
    curve) {

    view.translateX = translateFromX;
    view.translateY = translateFromY;

    // view.scaleX = 0;
    // view.scaleY = 0;

    view.animate({
        translate: { x: translateToX, y: translateToY },
        // scale: { x: 1, y: 1 },
        duration: duration,
        curve: curve
    });
}
