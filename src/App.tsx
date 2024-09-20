import './App.css';
import { FlightInfo } from './components/FlightInfo';
import { myFlight } from './sample_flight-info';

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
