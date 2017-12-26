import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "circularProgressBar",
    template: `
    <GridLayout [height]="length" [width]="length" class="text-center">
        <RadRadialGauge>
            <RadialScale tkRadialGaugeScales startAngle="-90" sweepAngle="360">
                <ScaleStyle tkRadialScaleStyle ticksVisible="false" labelsVisible="false" lineThickness="0">
                </ScaleStyle>

                <RadialBarIndicator tkRadialScaleIndicators minimum="0" maximum="100">
                    <BarIndicatorStyle tkRadialBarIndicatorStyle [fillColor]="fillBackgroundColor" cap="Round" [barWidth]="barWidth">
                    </BarIndicatorStyle>
                </RadialBarIndicator>

                <RadialBarIndicator tkRadialScaleIndicators minimum="0" [maximum]="value" isAnimated="true">
                    <BarIndicatorStyle tkRadialBarIndicatorStyle [fillColor]="fillColor" cap="Round" [barWidth]="barWidth">
                    </BarIndicatorStyle>
                </RadialBarIndicator>
            </RadialScale>
        </RadRadialGauge>
        <ng-content></ng-content>
    </GridLayout>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircularProgressBarComponent {
    @Input() size = 100;
    @Input() progress = 0;
    @Input() barWidth = 0.1;
    @Input() fillColor = "#EECCEE";
    @Input() fillBackgroundColor = "#DDDDDD";

    get length() {
        return Math.min(this.size, 250);
    };
    get value() {
        return Math.min(this.progress, 100);
    };
}