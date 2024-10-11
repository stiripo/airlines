import { FlightLeg } from "../FlightLeg/FlightLeg";
import { Props } from "../../types";
import styles from './FlightInfo.module.css';


export function FlightInfo({ flight }: Props) {
    let outbound = flight.legs[0];
    let inbound = flight.legs[1];
    return (
        <div className={styles.details_container}>
            <div className={styles.summary}>
                <div >{flight.carrier.caption}</div>
                <div className={styles.price}>
                    <div>{flight.price.amount} {flight.price.currency}</div>
                    <div className={styles.price_caption}>Стоимость для одного взрослого пассажира</div>
                </div>            </div>
            <div>
                <FlightLeg leg={outbound} />
                <hr className={styles.legsDivider} />
                <FlightLeg leg={inbound} />
            </div>
            <div role="button" className={styles.button}>ВЫБРАТЬ</div>
        </div>
    )
}



