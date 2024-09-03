import React from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import mapData from "../data/mapData.json";
import "leaflet/dist/leaflet.css";
import { LatLngLiteral } from "leaflet";
import { DataI } from "../models/data.interfaces";

interface Props {
    data: DataI[];
}

const getNumberOfCallRange = (data: DataI[]): number[] => {
    const regionValues = data.map((item) => item.numberOfCalls);
    const maxNumberOfCall = Math.max(...regionValues);
    const numberOfCall75per = maxNumberOfCall * 0.75;
    const numberOfCall50per = maxNumberOfCall * 0.5;
    const numberOfCall25per = maxNumberOfCall * 0.25;
    return [numberOfCall25per, numberOfCall50per, numberOfCall75per];
};

export function MapChart(props: Props) {
    const { data } = props;
    const center: LatLngLiteral = {
        lat: 47.726670974926954,
        lng: 66.40987671920664,
    };
    const getColor = (numberOfCall: number) => {
        const [numberOfCall25per, numberOfCall50per, numberOfCall75per] =
            getNumberOfCallRange(data);

        return numberOfCall > numberOfCall75per
            ? "#BD0026"
            : numberOfCall > numberOfCall50per
              ? "#FD8D3C"
              : numberOfCall > numberOfCall25per
                ? "#FED976"
                : "#7AFE76";
    };
    return (
        <MapContainer
            center={center}
            zoom={4}
            style={{ width: "100%", height: "100%" }}
        >
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png?key=N35BnHQ2LQf1yWX2WgK6"
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                maxZoom={8}
                minZoom={4}
            />
            {mapData.features.map((region: any, index: number) => {
                const coordinates = region.geometry.coordinates[0].map(
                    (item: any) => [item[1], item[0]]
                );
                const currentValue = data.find(
                    (item) => item.kato === region.properties.KATO
                )?.numberOfCalls;
                return (
                    <Polygon
                        key={index}
                        pathOptions={{
                            fillColor: getColor(currentValue!),
                            fillOpacity: 0.7,
                            weight: 2,
                            opacity: 1,
                            dashArray: [3],
                            color: "white",
                        }}
                        positions={coordinates}
                    />
                );
            })}
        </MapContainer>
    );
}
