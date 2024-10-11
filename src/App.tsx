import './App.css';
import { FlightInfo } from './components/FlightInfo/FlightInfo';
import { extractFlightData, fetchFlightData } from './utils';
import { useState, useEffect, useMemo } from 'react';
import { ExtractedFlightData, FilterState } from './types';
import { SidePanel } from './components/SidePanel/SidePanel';
import './App.css';


function App() {

  const [data, setData] = useState([] as ExtractedFlightData[]);
  const [filters, setFilters] = useState<FilterState>({
    'direct': false,
    'oneConnection': false,
  });
  const [airlineFilters, setAirlineFilters] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchFlightData().then((result) => {
      const data = extractFlightData(result);
      setData(data);
    });
  }, []);

  const renderedData = useMemo(() => produceRenderData(data, filters, airlineFilters), [data, filters, airlineFilters]);

  function produceRenderData(data: ExtractedFlightData[], filterSet: FilterState, airlineFilters: Set<string>) {

    let filteredData = data;

    if (filterSet.oneConnection || filterSet.direct) {
      filteredData = filteredData.filter((flight: ExtractedFlightData) =>
        (filterSet.oneConnection && (flight.legs[0].stops === 1 || flight.legs[1].stops === 1)) ||
        (filterSet.direct && (flight.legs[0].stops === 0 && flight.legs[1].stops === 0))
      )
    }
    if (filterSet.priceFrom) {
      filteredData = filteredData.filter((flight: ExtractedFlightData) => flight.price.amount >= filterSet.priceFrom!);
    }
    if (filterSet.priceTo) {
      filteredData = filteredData.filter((flight: ExtractedFlightData) => flight.price.amount <= filterSet.priceTo!);
    }
    if (airlineFilters.size > 0) {
      console.log(`Applying airline filtering`);
      filteredData = filteredData.filter((flight: ExtractedFlightData) => airlineFilters.has(flight.carrier.uid));
    }
    if (filterSet.sort === 'lowToHigh') {
      filteredData = [...filteredData].sort((a: ExtractedFlightData, b: ExtractedFlightData): number =>
        a.price.amount - b.price.amount);
    } if (filterSet.sort === 'highToLow') {
      filteredData = [...filteredData].sort((a: ExtractedFlightData, b: ExtractedFlightData): number =>
        b.price.amount - a.price.amount);
    } if (filterSet.sort === 'duration') {
      filteredData = [...filteredData].sort((a: ExtractedFlightData, b: ExtractedFlightData): number =>
        (a.legs[0].duration + a.legs[1].duration) - (b.legs[0].duration + b.legs[1].duration))
    }
    return filteredData;
  }

  function handleFiltering(filter: any) {
    console.log(`Adding filter ${filter} to the state`);
    const filterSet = { ...filters, ...filter };
    setFilters(filterSet);
  }

  function toggleConnections(option: 'direct' | 'oneConnection') {
    setFilters({
      ...filters,
      [option]: !filters[option]
    })
  }

  function toggleAirlines(option: string) {
    if (!airlineFilters.has(option)) {
      let updated = airlineFilters.add(option);
      setAirlineFilters((prevSet) =>
       new Set([...airlineFilters.values()]));
      //  console.log(updated);
      //  console.log(updated.size);
    } else {
      let updated = airlineFilters.delete(option);
      setAirlineFilters((prevSet) =>
        new Set([...airlineFilters.values()]));
        // console.log(airlineFilters);
        // console.log(airlineFilters.size);
    }
  }

  return (
    <div className='container'>
      <div className='sidePanel'>
        <SidePanel
          setFilter={handleFiltering}
          filterConnections={toggleConnections}
          filterAirlines={toggleAirlines}
          flights={data}
        />
      </div>
      <div className='main'>
        {renderedData ?
          renderedData.map((item) => <FlightInfo key={item.flightToken} flight={item} />)
          : <div>Loading...</div>}
      </div>
    </div>
  );
}

export default App;


