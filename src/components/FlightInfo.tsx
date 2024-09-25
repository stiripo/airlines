import { ExtractedFlightData } from "../utils";
import { FlightDate } from "./FlightDate";

interface Props {
    flight: ExtractedFlightData,
}

export function FlightInfo({ flight }: Props) {
    return (
        <>
            <div>
                <div>{flight.carrier}</div>
                <div>{flight.price.amount} {flight.price.currency}</div>
                <div>Стоимость для одного взрослого пассажира</div>
            </div>
            <div>
                <div>{flight.departureCity}, {flight.departureAirport.caption} <span>({flight.departureAirport.uid})</span></div>
                <div>{flight.arrivalCity}, {flight.arrivalAirport.caption} <span>({flight.arrivalAirport.uid})</span></div>
            </div>
            <div>
                <FlightDate date={flight.departureDate} />
                <div>{flight.duration / 60}</div>
                <FlightDate date={flight.arrivalDate} />
            </div>
            <div>{flight.stops} пересадка</div>
            <div>Рейс выполняет {flight.carrier}</div>
        </>
    )
}

