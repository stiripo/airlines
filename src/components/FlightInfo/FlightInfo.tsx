
import { FlightLeg } from "../FlightLeg/FlightLeg";
import { Props } from "../../types";
import styles from './FlightInfo.module.css';
import { Divider } from "@mui/material";


export function FlightInfo({ flight }: Props) {
    let outbound = flight.legs[0];
    let inbound = flight.legs[1];
    return (
        <div>
            <div className={styles.summary}>
                <div >{flight.carrier}</div>
                <div className={styles.price}>
                    <div>{flight.price.amount} {flight.price.currency}</div>
                    <div>Стоимость для одного взрослого пассажира</div>
                </div>            </div>
            <div className={styles.details}>
                <FlightLeg leg={outbound} />
                <Divider/>
                <FlightLeg leg={inbound} />
            </div>
            <div role="button" className={styles.button}>ВЫБРАТЬ</div>
        </div>
    )
}



