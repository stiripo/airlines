export interface ExtractedFlightData {
        'carrier': string,
        'price': number,
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
}

export function extractFlightData(data: any): ExtractedFlightData {
    let result: ExtractedFlightData = {
            carrier: '',
            price: 0,
            departureCity: '',
            departureAirport: {
                caption: '',
                uid: '',
            },
            arrivalCity: '',
            arrivalAirport: {
                caption: '',
                uid: ''
            }
    };

    result.carrier = data.flight.carrier.caption;
    result.price =  data.flight.price.total.amount;

    let outboundSegments =  data.flight.legs[0].segments;
    result.departureCity = outboundSegments[0].departureCity.caption;
    result.departureAirport = {
        'caption': outboundSegments[0].departureAirport.caption,
        'uid': outboundSegments[0].departureAirport.uid,
    };

    result.arrivalCity = outboundSegments[outboundSegments.length - 1].arrivalCity.caption;
    result.arrivalAirport = {
       'caption': outboundSegments[0].arrivalAirport.caption,
        'uid': outboundSegments[0].arrivalAirport.uid,
    };
    return result;
}