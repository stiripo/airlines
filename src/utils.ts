import { ExtractedFlightData } from "./types";


 export const fetchFlightData = async () => {
  const response = await fetch('flights.json');
  if (!response.ok) {
    console.log('Response not OK');
    throw new Error(`There's been a problem fetching data`);
  }
  const data = await response.json();
  const firstFlight = await data.result.flights[0];
  console.log(await firstFlight);
  return firstFlight;
};


export function extractFlightData(data: any): ExtractedFlightData {
    let result: ExtractedFlightData = {
        carrier: '',
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

    result.carrier = data.flight.carrier.caption;
    result.price.amount = data.flight.price.total.amount;
    result.price.currency = data.flight.price.total.currency;

    for (let i = 0; i < 2; i++) {
        let segments = data.flight.legs[i].segments;
        result.legs[i].departureCity = segments[0].departureCity.caption;
        result.legs[i].departureAirport = {
            'caption': segments[0].departureAirport.caption,
            'uid': segments[0].departureAirport.uid,
        };

        result.legs[i].arrivalCity = segments[segments.length - 1].arrivalCity.caption;
        result.legs[i].arrivalAirport = {
            'caption': segments[segments.length - 1].arrivalAirport.caption,
            'uid': segments[segments.length - 1].arrivalAirport.uid,
        };
        result.legs[i].departureDate = new Date(segments[0].departureDate);
        result.legs[i].duration = data.flight.legs[i].duration;
        result.legs[i].arrivalDate = new Date(segments[segments.length - 1].arrivalDate);
        result.legs[i].stops = data.flight.legs[i].segments.length - 1;
        result.legs[i].airline = data.flight.legs[i].segments[i].airline.caption;
    }
    return result;
}