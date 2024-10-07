import { LegProps } from "../../types";
import { FlightDate } from "../FlightDate/FlightDate";
import styles from './FlightLeg.module.css';


export function FlightLeg({ leg }: LegProps) {
    return (
        <>
            <div className={styles.route}>
                <div>{leg.departureCity}, {leg.departureAirport.caption} <span className={styles.airportShort}>({leg.departureAirport.uid})</span></div>
                <div>{[leg.arrivalCity, leg.arrivalAirport.caption].filter(x => x).join(', ')} <span>({leg.arrivalAirport.uid})</span></div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.date}>
                <FlightDate date={leg.departureDate} />
                <div className={styles.duration}>
                    <span className="material-icons">schedule</span>
                    <div>{Math.floor(leg.duration / 60)} ч. {leg.duration % 60} мин.</div>
                </div>
                <FlightDate date={leg.arrivalDate} />
            </div>
            <div>
                <div className={styles.connections_divider}>
                    <span className={styles.stops}>{leg.stops} пересадка</span>
                </div>
            </div>
            <div className={styles.operated_by}>Рейс выполняет {leg.airline}</div>
        </>
    )
}