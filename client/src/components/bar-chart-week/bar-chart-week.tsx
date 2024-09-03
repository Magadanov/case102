import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { DateProps, WeekdayDataI } from "../../models/data.interfaces";
import { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import cls from "./bar-chart-week.module.scss";
import Loading from "../loading/loading";

export default function BarChartWeek(props: { data: WeekdayDataI[] }) {
    const { data } = props;

    const CustomBar = (props: any) => {
        const { fill, x, y, width, height } = props;

        const radius = 20;
        return (
            <path
                d={`M${x},${y + radius}
                A${radius},${radius} 0 0,1 ${x + radius},${y}
                L${x + width - radius},${y}
                A${radius},${radius} 0 0,1 ${x + width},${y + radius}
                L${x + width},${y + height}
                L${x},${y + height}
                Z`}
                fill={fill}
            />
        );
    };

    return (
        <div className={cls["bar-chart-container"]}>
            {data ? (
                <div className={cls["bar-chart"]}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 50,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="weekday"
                                angle={-45}
                                textAnchor="end"
                            />
                            <YAxis dataKey="numberOfCalls" />
                            <Tooltip />
                            <Bar
                                dataKey="numberOfCalls"
                                fill="#3E1C44"
                                barSize={50}
                                shape={(prop: any) => <CustomBar {...prop} />}
                                activeBar={(prop: any) => (
                                    <CustomBar
                                        {...prop}
                                        fill="#6D5E66"
                                        stroke="#6D5E66"
                                    />
                                )}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}
