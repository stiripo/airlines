import './App.css';
import { FlightInfo } from './components/FlightInfo';
import { myFlight } from './sample_flight-info';
import { extractFlightData } from './utils';
import { downloadedFlight } from './sample_flight-info';

let extracted = extractFlightData(downloadedFlight);
console.log(extracted.carrier);
console.log(extracted.price);
console.log(extracted.departureCity);
console.log(extracted.arrivalCity);
console.log(extracted.departureAirport.caption);
console.log(extracted.departureAirport.uid);


function App() {

  return (
    <>
     <div>
     Hello Airlines!
    </div>
    <FlightInfo flight={myFlight}/>
    </>
  );
}

export default App;
