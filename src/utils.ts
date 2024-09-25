export interface ExtractedFlightData {
    'carrier': string,
    'price': {
        'amount': number,
        'currency': string,
    },
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
}

export function extractFlightData(data: any): ExtractedFlightData {
    let result: ExtractedFlightData = {
        carrier: '',
        price: {
            amount: 0,
            currency: '',
        },
        departureCity: '',
        departureAirport: {
            caption: '',
            uid: '',
        },
        arrivalCity: '',
        arrivalAirport: {
            caption: '',
            uid: ''
        },
        departureDate: new Date(),
        duration: 0,
        arrivalDate: new Date(),
        stops: 0,
    };

    result.carrier = data.flight.carrier.caption;
    result.price.amount = data.flight.price.total.amount;
    result.price.currency = data.flight.price.total.currency;

    let outboundSegments = data.flight.legs[0].segments;
    result.departureCity = outboundSegments[0].departureCity.caption;
    result.departureAirport = {
        'caption': outboundSegments[0].departureAirport.caption,
        'uid': outboundSegments[0].departureAirport.uid,
    };

    result.arrivalCity = outboundSegments[outboundSegments.length - 1].arrivalCity.caption;
    result.arrivalAirport = {
        'caption': outboundSegments[outboundSegments.length - 1].arrivalAirport.caption,
        'uid': outboundSegments[outboundSegments.length - 1].arrivalAirport.uid,
    };
    result.departureDate = new Date(outboundSegments[0].departureDate);
    result.duration = data.flight.legs[0].duration;
    result.arrivalDate = new Date(outboundSegments[outboundSegments.length - 1].arrivalDate);
    result.stops = data.flight.legs[0].segments.length - 1;
    return result;
}