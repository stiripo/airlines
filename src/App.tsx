import './App.css';
import { FlightInfo } from './components/FlightInfo/FlightInfo';
import { extractFlightData } from './utils';
import { downloadedFlight } from './sample_flight-info';

let flight = extractFlightData(downloadedFlight);

function App() {

  return (
    <>
    <FlightInfo flight={flight}/>
    </>
  );
}

export default App;
