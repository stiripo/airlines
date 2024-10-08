import './App.css';
import { FlightInfo } from './components/FlightInfo/FlightInfo';
import { extractFlightData, fetchFlightData } from './utils';
import { useState, useEffect } from 'react';
import { ExtractedFlightData } from './types';
import { SortPanel } from './components/SortPanel/SortPanel';
import './App.css';


function App() {

  const [data, setData] = useState([] as ExtractedFlightData[]);

  function sortData(criterion: string) {
    console.log(`sorting data by ${criterion}`);
    if (criterion === 'lowToHigh') {
      setData([...data].sort((a: ExtractedFlightData, b: ExtractedFlightData): number =>
        a.price.amount - b.price.amount));
    } else if (criterion === 'highToLow') {
      setData([...data].sort((a: ExtractedFlightData, b: ExtractedFlightData): number =>
        b.price.amount - a.price.amount));
    } else if (criterion === 'duration') {
      setData([...data].sort((a: ExtractedFlightData, b: ExtractedFlightData): number =>
      (a.legs[0].duration + a.legs[1].duration) - (b.legs[0].duration + b.legs[1].duration)))
    }
  };

useEffect(() => {
  fetchFlightData().then(result => setData(extractFlightData(result)));
}, []);


return (
  <div className='container'>
    <SortPanel
    setSortCriterion={sortData}
    />
    <div className='main'>
      {data ?
        data.map((item) => <FlightInfo key={item.flightToken} flight={item} />)
        : <div>Loading...</div>}
    </div>
  </div>
);
}

export default App;
