import { DateProp } from "../../types";
import styles from "./FlightDate.module.css";


export function FlightDate({ date }: DateProp) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
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
