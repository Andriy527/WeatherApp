import React from 'react';
import {setCities} from "@/services";
import {Tcountries} from "@/types";
interface Props {
    data: Tcountries | number[]
    type: string
    setItem: any
}
const Select = ({data, type, setItem} :Props) => {
    const handleSelectChange = (e: any) => {
        if (type === 'countries') {
          setItem(setCities(e.target.value, data));
        }

        if (type === 'maxTemp') {
            setItem(parseInt(e.target.value))
        }

        if (type === 'minTemp') {
            setItem(parseInt(e.target.value))
        }

    }
    return (
        <select defaultValue="DEFAULT" onChange={(e) => handleSelectChange(e)} className="py-[11px] px-[16px] block border-r-[12px] outline-[3px] outline-gray-lite border-r-transparent text-white rounded-md text-sm bg-gray-secondary">
            <option value="DEFAULT" disabled hidden>Choose {type}</option>
            {Array.isArray(data) && data.map((val: any, index: number) => {
                switch (type) {
                    case 'countries':
                        return <option value={val.country} key={`${val.country}+${index}`}>{val.country}</option>
                    case 'maxTemp':
                        return <option value={`${val}°`} key={`${val}plus+${index}`}>{`${val}°`}</option>
                    case 'minTemp':
                        return <option value={`${val}°`} key={`${val}minus+${index}`}>{`${val}°`}</option>
                    default:
                        return null
                }
            })}
        </select>
    );
};

export default Select;