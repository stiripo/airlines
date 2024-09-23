import { ExtractedFlightData } from "../utils"

interface Props {
    flight: ExtractedFlightData
}


export function FlightInfo({ flight }: Props) {
    return (
        <>
            <div>{flight.carrier}</div>
            <div>{flight.price}</div>
            <div>{flight.departureCity}</div>
            <div>{flight.departureAirport.caption}</div>
            <div>{flight.departureAirport.uid}</div>
            <div>{flight.arrivalCity}</div>
            <div>{flight.arrivalAirport.caption}</div>
            <div>{flight.arrivalAirport.uid}</div>
        </>
    )
}

