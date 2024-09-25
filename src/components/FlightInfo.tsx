import { ExtractedFlightData } from "../utils";
import { FlightLeg } from "./FlightLeg";

interface Props {
    flight: ExtractedFlightData,
}

export function FlightInfo({ flight }: Props) {
    let outbound = flight.legs[0];
    let inbound = flight.legs[1];
    return (
        <>
            <div>
                <div>{flight.carrier}</div>
                <div>{flight.price.amount} {flight.price.currency}</div>
                <div>Стоимость для одного взрослого пассажира</div>
            </div>
            <FlightLeg leg={outbound}/>
            <FlightLeg leg={inbound}/>
        </>
    )
}



