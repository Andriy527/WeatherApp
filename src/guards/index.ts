import {Tcountry} from "@/types";
import {ICountryItem} from "@/models";

export function isCountryObject(country: Tcountry): country is ICountryItem {
    return (country as ICountryItem).country !== undefined;
}

export function isSelectValCountry(selectVal: ICountryItem | number): selectVal is ICountryItem {
    return (selectVal as ICountryItem).cities !== undefined;
}