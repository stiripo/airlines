import { LegProps } from "../../types";
import { FlightDate } from "../FlightDate/FlightDate";
import { Divider } from '@mui/material';
import styles from './FlightLeg.module.css';


export function FlightLeg({ leg }: LegProps) {
    return (
        <>
            <div className={styles.route}>
                <div>{leg.departureCity}, {leg.departureAirport.caption} <span className={styles.airportShort}>({leg.departureAirport.uid})</span></div>
                <div>{leg.arrivalCity}, {leg.arrivalAirport.caption} <span>({leg.arrivalAirport.uid})</span></div>
            </div>
            <Divider></Divider>
            <div className={styles.date}>
                <FlightDate date={leg.departureDate} />
                <div className={styles.duration}>
                    <span className="material-icons">schedule</span>
                    <div>{Math.floor(leg.duration / 60)} ч. {leg.duration % 60} мин.</div>
                </div>
                <FlightDate date={leg.arrivalDate} />
            </div>
            <Divider variant="inset">
                <div className={styles.stops}>{leg.stops} пересадка</div>
            </Divider>
            <div className={styles.operatedBy}>Рейс выполняет {leg.airline}</div>
            <Divider/>
        </>
    )
}