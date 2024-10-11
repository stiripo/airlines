import { ExtractedFlightData } from "./types";

export function addZeros(num: number) {
    if (num < 10) {
        return '0' + num;
    }
    return num;
}



export const fetchFlightData = async () => {
    const response = await fetch('flights.json');
    if (!response.ok) {
        console.log('Response not OK');
        throw new Error(`There's been a problem fetching data`);
    }
    const data = await response.json();
    const flightArr = await data.result.flights;
    return flightArr as any[];
};


export function extractFlightData(data: any[]): ExtractedFlightData[] {
    let list = [];
    for (let item of data) {
        let result: ExtractedFlightData = {
            flightToken: '',
            carrier: {
                uid: '',
                caption: '',
            },
            price: {
                amount: 0,
                currency: '',
            },
            legs: [
                {
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
                    airline: ' ',
                },
                {
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
                    airline: ' ',
                }
            ],
        };

        result.flightToken = item.flightToken;
        result.carrier.uid = item.flight.carrier.uid;
        result.carrier.caption = item.flight.carrier.caption;
        result.price.amount = item.flight.price.total.amount;
        result.price.currency = item.flight.price.total.currency;

        for (let i = 0; i < 2; i++) {
            let segments = item.flight.legs[i].segments;
            result.legs[i].departureCity = segments[0].departureCity?.caption;
            result.legs[i].departureAirport = {
                'caption': segments[0].departureAirport.caption,
                'uid': segments[0].departureAirport.uid,
            };

            result.legs[i].arrivalCity = segments[segments.length - 1].arrivalCity?.caption;
            result.legs[i].arrivalAirport = {
                'caption': segments[segments.length - 1].arrivalAirport.caption,
                'uid': segments[segments.length - 1].arrivalAirport.uid,
            };
            result.legs[i].departureDate = new Date(segments[0].departureDate);
            result.legs[i].duration = item.flight.legs[i].duration;
            result.legs[i].arrivalDate = new Date(segments[segments.length - 1].arrivalDate);
            result.legs[i].stops = item.flight.legs[i].segments.length - 1;
            result.legs[i].airline = item.flight.legs[i].segments[i]?.airline.caption;
        }
        list.push(result);
    }
    return list;
}