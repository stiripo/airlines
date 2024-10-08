import { DateProp } from "../../types";
import styles from "./FlightDate.module.css";
import { addZeros } from "../../utils";


export function FlightDate({ date }: DateProp) {
    let hours = addZeros(date.getHours());
    let minutes = addZeros(date.getMinutes());
    let day = date.getDate();
    let month = new Intl.DateTimeFormat("ru", { month: "short" }).format(date);
    let weekDay = new Intl.DateTimeFormat("ru", { weekday: "short" }).format(date);
    return (
        <>
            <div className={styles.date}>
                <div className={styles.time}>{hours}:{minutes}</div>
                <div className={styles.day}>{day} {month} {weekDay}</div>
            </div>
        </>
    )
}
