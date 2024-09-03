import Circle from "react-circle";

export interface ICircleChartStat {
    percentage: number;
    bgColor: string;
    progressColor: string;
    label1: string;
    label2: string;
}

export function CircleChart(prop: Partial<ICircleChartStat>) {
    const { percentage, bgColor, progressColor } = prop;
    return (
        <>
            <Circle
                progress={percentage}
                size="200"
                progressColor={progressColor}
                bgColor={bgColor}
                roundedStroke
            />
        </>
    );
}
