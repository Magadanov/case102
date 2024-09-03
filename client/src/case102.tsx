import { useEffect, useState } from "react";
import CircleChartStat from "./components/kpi-circle/circle-chart-stat/circle-chart-stat";
import BarChartWeek from "./components/bar-chart-week/bar-chart-week";
import BarChartArrival from "./components/bar-chart-arrival/bar-chart-arrival";
import TableRegion from "./components/table-region/table-region";
import BarChartReason from "./components/bar-chart-reason/bar-chart-reason";
import { MapChart } from "./components/map-chart";
import axios from "./axiosInstance";
import "./styles/style.scss";
import Loading from "./components/loading/loading";
import KpiCircle from "./components/kpi-circle/kpi-circle";
import {
    ArrivedDataI,
    DataI,
    PeriodData,
    ReasonDataI,
    WeekdayDataI,
} from "./models/data.interfaces";

export default function Case102() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [data, setData] = useState<DataI[] | null>(null);
    const [reasonData, setReasonData] = useState<ReasonDataI[] | null>(null);
    const [arrivedData, setArrivedData] = useState<ArrivedDataI[] | null>(null);
    const [weekdayData, setWeekdayData] = useState<WeekdayDataI[] | null>(null);
    const [periodData, setPeriodData] = useState<PeriodData | null>(null);

    useEffect(() => {
        setData(null);
        setReasonData(null);
        setArrivedData(null);
        setWeekdayData(null);
        setPeriodData(null);

        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "/api/regionData",
                    { startDate, endDate },
                    { signal: controller.signal }
                );
                setData(response.data);

                const periodResponse = await axios.post(
                    "/api/periodData",
                    { startDate, endDate },
                    { signal: controller.signal }
                );
                setPeriodData(periodResponse.data);

                const weekdayResponse = await axios.post(
                    "/api/weekdayData",
                    { startDate, endDate },
                    { signal: controller.signal }
                );
                setWeekdayData(weekdayResponse.data);

                const arrivedResponse = await axios.post(
                    "/api/arrivedData",
                    { startDate, endDate },
                    { signal: controller.signal }
                );
                setArrivedData(arrivedResponse.data);

                const reasonResponse = await axios.post(
                    "/api/reasonData",
                    { startDate, endDate },
                    { signal: controller.signal }
                );
                setReasonData(reasonResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        return () => {
            controller.abort();
        };
    }, [startDate, endDate]);

    return (
        <div className="container">
            <section className="header">
                <div className="input-groups">
                    <span className="header__name">Период:</span>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(event) => {
                            setStartDate(event.target.value);
                        }}
                        max={endDate}
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(event) => {
                            setEndDate(event.target.value);
                        }}
                        min={startDate}
                    />
                </div>
            </section>

            <section className="main-content">
                <div className="item-container">
                    <div className="map-container">
                        {data?.length ? <MapChart data={data} /> : <Loading />}
                    </div>
                </div>
                <div className="item-container">
                    <KpiCircle data={periodData!} />
                    <BarChartWeek data={weekdayData!} />
                </div>
                <div className="item-container">
                    {data?.length ? <TableRegion data={data} /> : <Loading />}
                </div>
                <div className="item-container">
                    {arrivedData?.length ? (
                        <BarChartArrival data={arrivedData!} />
                    ) : (
                        <Loading />
                    )}
                </div>
                <div className="item-container">
                    {reasonData?.length ? (
                        <BarChartReason data={reasonData} />
                    ) : (
                        <Loading />
                    )}
                </div>
            </section>
        </div>
    );
}
