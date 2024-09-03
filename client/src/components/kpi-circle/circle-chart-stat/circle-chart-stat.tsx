import { CircleChart, ICircleChartStat } from "../circle-chart/circle-chart";

export default function CircleChartStat(prop: Required<ICircleChartStat>) {
    const { percentage, bgColor, progressColor, label1, label2 } = prop;
    return (
        <>
            <CircleChart
                percentage={percentage}
                bgColor={bgColor}
                progressColor={progressColor}
            />
            <div className="circle-chart-stat">
                <div className="circle-chart-stat-content">
                    <span style={{ backgroundColor: progressColor }}>
                        {percentage} %
                    </span>
                    {label1}
                </div>
                <div className="circle-chart-stat-content">
                    <span style={{ backgroundColor: bgColor }}>
                        {100 - percentage} %
                    </span>
                    {label2}
                </div>
            </div>
        </>
    );
}
