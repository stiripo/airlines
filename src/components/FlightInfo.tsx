import { ExtractedFlightData } from "../utils"

interface Props {
    flight: ExtractedFlightData
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
                <div>{flight.departureDate.hours}:{flight.departureDate.minutes}{flight.departureDate.day}{flight.departureDate.month}{flight.departureDate.weekDay}</div>
                <div>{flight.duration / 60}</div>
                <div>{flight.arrivalDate}</div>
            </div>
            <div>{flight.stops} пересадка</div>
            <div>Рейс выполняет {flight.carrier}</div>
        </>
    )
}

