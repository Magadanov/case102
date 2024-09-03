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
import { DateProps, ReasonDataI } from "../../models/data.interfaces";
import { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import cls from "./bar-chart-reason.module.scss";
import Loading from "../loading/loading";

export default function BarChartReason(props: { data: ReasonDataI[] }) {
    const { data } = props;

    return (
        <div className={cls.container}>
            {data.length && (
                <div className={cls["bar-chart"]}>
                    <h2>Категории вызовов</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            layout="vertical"
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <YAxis
                                dataKey="reason"
                                type="category"
                                tick={{ fontSize: "6px" }}
                            />
                            <XAxis type="number" />
                            <Tooltip />
                            <Bar
                                dataKey="numberOfCalls"
                                fill="#82ca9d"
                                activeBar={
                                    <Rectangle fill="gold" stroke="purple" />
                                }
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
