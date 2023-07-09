'use client'
import Chart from "@/components/Chart";
import {useEffect, useState} from "react";
import {getCountries} from "@/services";
import Select from "@/components/Select";
import {tempArray} from "@/helpers";
import Table from "@/components/Table";
import {Tcountries, Tcountry} from "@/types";
import {ICountries} from "@/models";

export default function Home() {
 const [countries, setCountries] = useState<Tcountries>('');
 const [country, setCountry] = useState<Tcountry>('');
 const [minTemp, setMinTemp] = useState<number | null>(null);
 const [maxTemp, setMaxTemp] = useState<number | null>(null)

useEffect(() => {
    getCountries().then((data: ICountries) => setCountries(data.data));
}, [])

  return (
      <main className="flex min-h-screen flex-col items-center bg-gray-600 justify-center p-24 h-[100vh]">
          <div className="flex flex-row justify-between">
              <div className="flex flex-col w-[43%] h-100 pr-[15px]">
                  <div className="overflow-x-auto">
                      <div className="p-1.5 min-w-full inline-block align-middle overflow-hidden rounded-[12px] bg-gray-primary py-[25px] px-[16px]">
                          <Chart country={country}/>
                      </div>
                  </div>
              </div>
              <div className="flex flex-col w-[57%] pl-[15px]">
                  <div className="overflow-x-auto">
                      <div className="p-1.5 min-w-full h-[440px] inline-block align-middle overflow-hidden rounded-[12px] bg-gray-primary py-[25px] px-[16px]">
                          <div className="grid grid-cols-3 gap-x-[8px] w-4/5">
                              <Select data={countries} type={'countries'} setItem={setCountry}/>
                              <Select data={tempArray} type={'minTemp'} setItem={setMinTemp}/>
                              <Select data={tempArray} type={'maxTemp'} setItem={setMaxTemp}/>
                          </div>
                          <section className="max-h-[320px] block overflow-y-auto rounded-[12px] mt-[30px] border border-gray-secondary p-0">
                              <Table country={country} minTemp={minTemp} maxTemp={maxTemp}/>
                          </section>
                      </div>
                  </div>
              </div>
          </div>
      </main>
  )
}
