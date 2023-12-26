
import React, {useState} from "react"
import BarChart from "../components/BarChart"
import { min } from "d3"

export default function Home({data}){


    function checkForYear(row){
        return row.TIME==2019
    }
    const df = data
        .filter(checkForYear)
        .map(
            row=> ({label: row.LOCATION, value: parseFloat(row['LITRES/CAPITA'])})
            )
        .sort(
            (a,b)=> a.value-b.value
            )
    console.log(df[0])

    return(
        <div>
            <h1>alcohol consumption per capita in 2019</h1>
            <BarChart data={df} width={1300} height={600}/>
        </div>
    )
}