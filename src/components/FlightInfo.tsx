interface FlightData {
    'flight': {
        'carrier': string,
        'price': number,
        'departureCity': string,
        'arrivalCity': string,
    }
}

export function FlightInfo({ flight }: FlightData) {
    return (
        <>
            <div>{flight.carrier}</div>
            <div>{flight.price}</div>
            <div>{flight.departureCity}</div>
            <div>{flight.arrivalCity}</div>
        </>
    )
}

