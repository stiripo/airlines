import './App.css';
import { FlightInfo } from './components/FlightInfo';
import { extractFlightData } from './utils';
import { downloadedFlight } from './sample_flight-info';

let flight = extractFlightData(downloadedFlight);
// console.log(flight.carrier);
// console.log(flight.price);
// console.log(flight.departureCity);
// console.log(flight.arrivalCity);
// console.log(flight.departureAirport.caption);
// console.log(flight.departureAirport.uid);

function App() {

  return (
    <>
    <FlightInfo flight={flight}/>
    </>
  );
}

export default App;
