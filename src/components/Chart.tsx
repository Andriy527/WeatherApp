'use client';
import React, {useEffect, useState} from 'react';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {options} from "@/config";
import {getCoordinate, getWeeklyTemperature} from "@/services";
import {Tcountry} from "@/types";
import {isCountryObject} from "@/guards";
import {IChartData} from "@/models";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    country: Tcountry
}

const Chart = ({country}: Props) => {
    const [weeklyTemp, setWeeklyTemp] = useState<number[]>([]);
    const labelVal: Tcountry = isCountryObject(country) ? country.country : '';
    const labels: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data: IChartData = {
        labels,
        datasets: [
            {
                label: `${labelVal} middle temperature`,
                data: weeklyTemp,
                backgroundColor: '#B3FC4F',
                borderRadius: 8,
            },
        ],
    };

    useEffect(() => {
        (async () => {
            if (isCountryObject(country)) {
                try {
                    let coordinate = await getCoordinate('country', country.country);
                    let tempArray: number[] = await getWeeklyTemperature({
                        lat: coordinate.lat,
                        lon: coordinate.lon,
                    })
                    setWeeklyTemp(tempArray);
                } catch (e) {
                    let message
                    if (e instanceof Error) message = e.message
                    else message = String(e)
                    throw new Error(message)
                }
            }
        })()
    }, [country])

    return (
        <div>
            <Bar options={options} height={390} data={data}/>
        </div>
    );
};

export default Chart;