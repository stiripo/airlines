import './App.css';
import { FlightInfo } from './components/FlightInfo/FlightInfo';
import { extractFlightData, fetchFlightData, showSlice } from './utils';
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
  const [elementsToShow, setElementsToShow] = useState<number>(2);

  useEffect(() => {
    fetchFlightData().then((result) => {
      const data = extractFlightData(result);
      setData(data);
    });
  }, []);

  const flightsToDisplay = useMemo(() => selectFlightsToDisplay(data, filters, airlineFilters), [data, filters, airlineFilters]);
  const airlinesToDisplay = useMemo(() => selectAirlinesToDisplay(data, filters), [data, filters]);

  function filterByConnections(data: ExtractedFlightData[]) {
    if (filters.oneConnection || filters.direct) {
      return data.filter((flight: ExtractedFlightData) =>
        (filters.oneConnection && (flight.legs[0].stops === 1 || flight.legs[1].stops === 1)) ||
        (filters.direct && (flight.legs[0].stops === 0 && flight.legs[1].stops === 0))
      )
    } else {
      return data;
    }
  }

  function filterByPriceFrom(data: ExtractedFlightData[]) {
    if (filters.priceFrom) {
      return data.filter((flight: ExtractedFlightData) => flight.price.amount >= filters.priceFrom!);
    } else {
      return data;
    }
  }

  function filterByPriceTo(data: ExtractedFlightData[]) {
    if (filters.priceTo) {
      return data.filter((flight: ExtractedFlightData) => flight.price.amount <= filters.priceTo!);
    } else {
      return data;
    }
  }

  function filterByAirlines(data: ExtractedFlightData[]) {
    if (airlineFilters.size > 0) {
      return data.filter((flight: ExtractedFlightData): boolean => airlineFilters.has(flight.carrier.uid));
    } else {
      return data;
    }
  }

  function sortFlights(data: ExtractedFlightData[]) {
    let filteredData = data;
    if (filters.sort === 'lowToHigh') {
      filteredData = [...filteredData].sort((a: ExtractedFlightData, b: ExtractedFlightData): number =>
        a.price.amount - b.price.amount);
    } else if (filters.sort === 'highToLow') {
      filteredData = [...filteredData].sort((a: ExtractedFlightData, b: ExtractedFlightData): number =>
        b.price.amount - a.price.amount);
    } else if (filters.sort === 'duration') {
      filteredData = [...filteredData].sort((a: ExtractedFlightData, b: ExtractedFlightData): number =>
        (a.legs[0].duration + a.legs[1].duration) - (b.legs[0].duration + b.legs[1].duration))
    }
    return filteredData;
  }

  function selectFlightsToDisplay(data: ExtractedFlightData[], filterSet: FilterState, airlineFilters: Set<string>) {
    let filteredData = data.slice();
    filteredData = filterByConnections(filteredData);
    filteredData = filterByPriceFrom(filteredData);
    filteredData = filterByPriceTo(filteredData);
    filteredData = filterByAirlines(filteredData);
    filteredData = sortFlights(filteredData);
    return filteredData;
  }

  function selectAirlinesToDisplay(data: ExtractedFlightData[], filterSet: FilterState) {
    let filteredData = data;
    filteredData = filterByConnections(filteredData);
    filteredData = filterByPriceFrom(filteredData);
    filteredData = filterByPriceTo(filteredData);
    return filteredData;
  }

  function handleFiltering(filter: object) {
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
      airlineFilters.add(option);
      setAirlineFilters((prevSet) =>
        new Set([...airlineFilters.values()]));
    } else {
      airlineFilters.delete(option);
      setAirlineFilters((prevSet) =>
        new Set([...airlineFilters.values()]));
    }
  }

  return (
    <div className='container'>
      <div className='sidePanel'>
        <SidePanel
          setFilter={handleFiltering}
          filterConnections={toggleConnections}
          filterAirlines={toggleAirlines}
          flights={airlinesToDisplay}
        />
      </div>
      <div className='main'>
        {flightsToDisplay ?
          showSlice(flightsToDisplay, elementsToShow).map((item) => <FlightInfo key={item.flightToken} flight={item} />)
          : <div>Loading...</div>}
        <button
          className='showMoreBtn'
          onClick={() => setElementsToShow((prev) => prev + 1)}
        >Показать еще</button>
      </div>
    </div>
  );
}

export default App;


