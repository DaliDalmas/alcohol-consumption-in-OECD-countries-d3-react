import './App.css';
import Home from './Home';
import * as d3 from 'd3'
import { useState, useEffect } from 'react';


function App() {
  const csvUrl = 'https://raw.githubusercontent.com/DaliDalmas/alcohol-consumption-in-OECD-countries-d3-react/main/data/OECD%20Alcohol%20Consumption%20per%20Capita.csv'
  var [Data, setData] = useState(null)
  
  useEffect(
    ()=>{
      d3.csv(csvUrl).then(result=>{
        setData(result)
        console.log(result[0])
      })
    },[]
  )

  return (
    <div className="App">
      {Data? <Home data={Data}/> : <div> Data Loading</div>}
    </div>
  );
}

export default App;
