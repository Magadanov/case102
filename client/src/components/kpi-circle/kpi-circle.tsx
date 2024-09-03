import { useEffect, useState } from "react";
import { DateProps, PeriodData } from "../../models/data.interfaces";
import axios from "../../axiosInstance";
import CircleChartStat from "./circle-chart-stat/circle-chart-stat";
import Loading from "../loading/loading";
import "./kpi-circle.scss";

export default function KpiCircle(props: { data: PeriodData }) {
    const { data } = props;

    return (
        <div
            className="circle-container"
            style={{
                gridTemplateColumns: data ? "repeat(2, 1fr)" : "1fr",
            }}
        >
            {data ? (
                <>
                    <div className="circle-chart __period">
                        <CircleChartStat
                            percentage={data.day_percentage}
                            bgColor={"#C99B21"}
                            progressColor={"#364F94"}
                            label1={"Day"}
                            label2={"Night"}
                        />
                    </div>
                    <div className="circle-chart __holiday">
                        <CircleChartStat
                            percentage={data.holidays_percentage}
                            bgColor={"#2DA09B"}
                            progressColor={"#87203C"}
                            label1={"Holiday"}
                            label2={"Usual"}
                        />
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}
