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

export interface FlightProps {
    flight: ExtractedFlightData,
    key: string,
}

export interface ExtractedFlightData {
    'flightToken': string,
    'carrier': {
        'uid': string,
        'caption': string,
    },
    'price': {
        'amount': number,
        'currency': string,
    },
    'legs': Leg[],
}

export interface FilterState {
    'direct': boolean,
    'oneConnection': boolean,
    'priceFrom'?: number,
    'priceTo'?: number,
    'airlines'?: string,
    'sort'?: string,
}

export interface SidePanelProps {
    setFilter: React.Dispatch<React.SetStateAction<object>>,
    filterConnections: (option: 'direct' | 'oneConnection') => void,
    filterAirlines: (opton: string) => void,
    flights: ExtractedFlightData[],
}


