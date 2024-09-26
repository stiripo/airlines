export interface DateProp {
    date: Date,
}

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

export interface Props {
    flight: ExtractedFlightData,
}

export interface ExtractedFlightData {
    'carrier': string,
    'price': {
        'amount': number,
        'currency': string,
    },
    'legs': Leg[],
}