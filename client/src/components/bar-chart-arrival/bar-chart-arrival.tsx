import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Brush,
} from "recharts";
import { ArrivedDataI, DateProps } from "../../models/data.interfaces";
import axios from "../../axiosInstance";
import cls from "./bar-chart-arrival.module.scss";
import Loading from "../loading/loading";

interface BarDataI {
    region: string;
    [key: string]: string | number | undefined;
}

const dataColor: Record<string, string> = {
    "Till 15 min": "#7ba591",
    "Till 30 min": "#537C78",
    "More 30 min": "#cc222b",
};

const transformData = (data: ArrivedDataI[]) => {
    const transformed: { [key: string]: BarDataI } = {};
    data.forEach(({ region, arrived_time, numberOfCalls }) => {
        if (!transformed[region]) {
            transformed[region] = { region };
        }
        transformed[region][arrived_time] = numberOfCalls;
    });
    return Object.values(transformed);
};

type BarPropsState = {
    "Till 15 min": boolean;
    "Till 30 min": boolean;
    "More 30 min": boolean;
    hover: string | null;
};

export default function BarChartArrival(props: { data: ArrivedDataI[] }) {
    const { data } = props;
    const [transformedData, setTransformedData] = useState<BarDataI[] | null>(
        null
    );
    const [barProps, setBarProps] = useState<BarPropsState>({
        "Till 15 min": false,
        "Till 30 min": false,
        "More 30 min": false,
        hover: null,
    });

    const handleLegendMouseEnter = (e: any) => {
        if (!barProps[e.dataKey as keyof BarPropsState]) {
            setBarProps({ ...barProps, hover: e.dataKey });
        }
    };

    const handleLegendMouseLeave = () => {
        setBarProps({ ...barProps, hover: null });
    };

    const selectBar = (e: any) => {
        setBarProps({
            ...barProps,
            [e.dataKey]: !barProps[e.dataKey as keyof BarPropsState],
            hover: null,
        });
    };

    useEffect(() => {
        if (data?.length) {
            setTransformedData(transformData(data));
        }
    }, [data]);
    return (
        <div className={cls.container}>
            {data.length && (
                <div className={cls["bar-chart"]}>
                    <h2>Вызовы по регионам</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={transformedData || []}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 200,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="region"
                                angle={-90}
                                textAnchor="end"
                                interval={0}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend
                                verticalAlign="top"
                                wrapperStyle={{ lineHeight: "40px" }}
                                onClick={selectBar}
                                onMouseOver={handleLegendMouseEnter}
                                onMouseOut={handleLegendMouseLeave}
                            />
                            {Object.keys(dataColor).map((key) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    stackId="a"
                                    fill={dataColor[key]}
                                    hide={
                                        barProps[key as keyof BarPropsState] ===
                                        true
                                    }
                                    fillOpacity={Number(
                                        barProps.hover === key ||
                                            !barProps.hover
                                            ? 1
                                            : 0.6
                                    )}
                                />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
