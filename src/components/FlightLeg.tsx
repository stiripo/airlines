import { FlightDate } from "./FlightDate";


export interface Leg {
        'departureCity': string,
        'departureAirport': {
            'caption': string,
            'uid': string,
        },
        'arrivalCity': string,
        'arrivalAirport': {
            'caption': string,
            'uid': string,
        },
        'departureDate': Date,
        'duration': number,
        'arrivalDate': Date,
        'stops': number,
        'airline': string,
}
export interface LegProps {
    leg: Leg,
}

export function FlightLeg( { leg }: LegProps) {
    return (
        <>
        <div>
        <div>{leg.departureCity}, {leg.departureAirport.caption} <span>({leg.departureAirport.uid})</span></div>
        <div>{leg.arrivalCity}, {leg.arrivalAirport.caption} <span>({leg.arrivalAirport.uid})</span></div>
    </div>
    <div>
        <FlightDate date={leg.departureDate} />
        <div>{Math.floor(leg.duration / 60)} ч. {leg.duration % 60} мин.</div>
        <FlightDate date={leg.arrivalDate} />
    </div>
    <div>{leg.stops} пересадка</div>
    <div>Рейс выполняет {leg.airline}</div>
        </>
    )
}