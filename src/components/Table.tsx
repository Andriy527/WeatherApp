'use client';

import React, {useEffect, useState} from 'react';
import {getCoordinate, getWeatherInfo} from "@/services";
import {getCurrentDate, sleep} from "@/helpers";
import {Tcountry} from "@/types";
import {isCountryObject} from "@/guards";
import {IWeatherInfo} from "@/models";
interface Props {
    country: Tcountry,
    minTemp: number | null,
    maxTemp: number | null
}
const Table = ({country, minTemp, maxTemp}: Props) => {
    const [citiesInfo, setCitiesInfo] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let limitCities: string[];
    let loadingInfo: string = 'Loading...';

    useEffect(() => {
        if(isCountryObject(country)) {
            limitCities = country.cities.filter((item: string, index: number) => index <= 50);

            if (country.cities.length) setIsLoading(true);

            Promise.all(limitCities.map(async (item: string, index: number) => {
                try {
                    await sleep(index * 400);

                    let coordinate: any = await getCoordinate('city', item);

                    if (coordinate) {
                        let weatherInfo: IWeatherInfo = await getWeatherInfo({
                            lat: coordinate.lat,
                            lon: coordinate.lon,
                        }, item)
                        if (weatherInfo) return weatherInfo;
                    }
                } catch (e) {
                    let message
                    if (e instanceof Error) message = e.message
                    else message = String(e)
                    throw new Error(message)
                }
            })).then((res: (IWeatherInfo | undefined)[]) => {
                    setCitiesInfo(res.filter((item: IWeatherInfo | undefined) => {
                            if (item && maxTemp && minTemp) return item.minTemp >= minTemp && item.maxTemp <= maxTemp;

                            if (item && minTemp) return item.minTemp >= minTemp;

                            if (item && maxTemp) return item.maxTemp <= maxTemp;

                            if (item) return item
                        })
                    )
                    setIsLoading(false);
                }
            );
        }
    }, [country, minTemp, maxTemp])
    return (
        <>
            <table className="min-w-full rounded-[12px] divide-y divide-gray-200 dark:divide-gray-700 border border-gray-secondary">
                <thead>
                <tr className="bg-black-primary">
                    <th scope="col" className="px-6 bg-black py-3 border-r border-gray-secondary text-left text-[14px] font-medium text-white">City
                    </th>
                    <th scope="col" className="px-6 py-3 border-r border-gray-secondary  text-right text-[14px] font-medium text-white">Temparature max
                    </th>
                    <th scope="col" className="px-6 py-3 border-r border-gray-secondary  text-right text-[14px] font-medium text-white">Temparature min
                    </th>
                    <th scope="col" className="px-6 py-3 border-r border-gray-secondary  text-right text-[14px] font-medium text-white">Wind direction
                    </th>
                </tr>
                </thead>
                <tbody className="border-none">
                {isLoading
                    ?
                    <tr className="text-white"><td><p className="p-[10px]">Loading...</p> </td></tr>
                    :
                    citiesInfo.length
                        ?
                        citiesInfo.map((item: any) => {
                            return <tr key={item.city} className="odd:bg-gray-primary even:bg-gray-secondary">
                                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-white">{item.city}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-white text-right">{`${item.maxTemp}°`}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-white text-right">{`${item.minTemp}°`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-white text-right text-[14px] font-medium">
                                    {`${item.windDirection}°`}
                                </td>
                            </tr>
                        })
                        :
                        <tr className="text-white p-[10px]"><td><p className="p-[10px]">please select a Country</p></td></tr>
                }
                </tbody>
            </table>
        </>
    );
};

export default Table;