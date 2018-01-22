export function translateViewByXandY(view, translateFromX, translateToX, translateFromY, translateToY, duration, curve) {
    view.translateX = translateFromX;
    view.translateY = translateFromY;

    view.animate({
        translate: { x: translateToX, y: translateToY },
        duration: duration,
        curve: curve
    });
}