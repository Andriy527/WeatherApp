export interface ICountries {
    error: boolean,
    msg: string,
    data: ICountryItem[]
}

export interface ICountryItem {
    iso2: string,
    iso3: string,
    country: string,
    cities: string[]
}

export interface ICoordinate {
    lat: number,
    lon: number
}

export interface IWeatherInfo {
    city: string,
    minTemp: number,
    maxTemp: number,
    windDirection: number
}

export interface IChartData {
    labels: string[],
    datasets: any[]
}
