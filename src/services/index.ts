import {$weather, $geo, $countries} from "@/http";
import {AxiosResponse} from "axios";
import {getCurrentDate, getDate} from "@/helpers";
import {ICoordinate, ICountries, ICountryItem, IWeatherInfo} from "@/models";
import {Tcountries} from "@/types";
import {isSelectValCountry} from "@/guards";

export const getCountries = async (): Promise<ICountries> => {
    const result: AxiosResponse<ICountries> = await $countries.get('/countries');
    const data: ICountries = await result.data;

    return data;
}

export const setCities = (country: string, countries: number[] | Tcountries): ICountryItem | string => {
    let city: ICountryItem | string = '';

    if (Array.isArray(countries)) {
        countries.map((item: ICountryItem | number) => {
            if (isSelectValCountry(item) && country === item.country) city = item;
        })
    }

    return city;
}

export const getCoordinate = async (type: string, name: string): Promise<any> => {
    const result: AxiosResponse<any> = await $geo.get(`/search?${type}=${name}`);

    return result.data[0]
}

export const getWeatherInfo = async (coordinate: ICoordinate, city: string): Promise<IWeatherInfo> => {
    const result = await $weather.get(`/dwd-icon?latitude=${coordinate.lat}&longitude=${coordinate.lon}&hourly=temperature_2m,winddirection_10m&start_date=${getCurrentDate()}&end_date=${getCurrentDate()}`);
    const temperature = await result.data.hourly.temperature_2m;
    const wind = await result.data.hourly.winddirection_10m;
    const minTemp: number = Math.min(...temperature);
    const maxTemp: number = Math.max(...temperature);
    const middleWind: number = wind[wind.length / 2 | 0];

    return {
        city: city,
        minTemp: minTemp,
        maxTemp: maxTemp,
        windDirection: middleWind
    }
}

export const getWeeklyTemperature = async (coordinate: ICoordinate): Promise<number[]> => {
    const result = await $weather.get(`/dwd-icon?latitude=${coordinate.lat}&longitude=${coordinate.lon}&hourly=temperature_2m,&start_date=${getDate(6)}&end_date=${getCurrentDate()}`);
    const temperature = await result.data.hourly.temperature_2m;

    let weeklyTempArray: number[][] = new Array(7);
    let counter: number = 0;

    temperature.forEach((val: any, index: number) => {
        if (index % 24 == 0) counter++;

        if (!Array.isArray(weeklyTempArray[counter - 1])) weeklyTempArray[counter - 1] = [];

        weeklyTempArray[counter - 1].push(val);
    })

    const middleWeeklyTempArray: number[] = weeklyTempArray.map((item: any) => {
        return item[item.length / 2 | 0];
    })

    return middleWeeklyTempArray;
}

