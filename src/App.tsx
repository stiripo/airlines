import './App.css';
import { FlightInfo } from './components/FlightInfo/FlightInfo';
import { extractFlightData, fetchFlightData } from './utils';
import { useState, useEffect } from 'react';
import { ExtractedFlightData } from './types';


function App() {

  const [data, setData] = useState({} as ExtractedFlightData);

  useEffect(() => {
    fetchFlightData().then(result => setData(extractFlightData(result)));
  }, []);

  return (
    <>
      {data.legs ?  <FlightInfo flight={data} /> : <div>Loading...</div>}
    </>
  );
}

export default App;
