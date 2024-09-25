
export interface DateProp {
    date: Date,
}

export function FlightDate({ date }: DateProp) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    let month = new Intl.DateTimeFormat("ru", { month: "short" }).format(date);
    let weekDay = new Intl.DateTimeFormat("ru", { weekday: "short" }).format(date);
    return (
        <div>
            {hours}:{minutes}
            {day}
            {month}
            {weekDay}
        </div>
    )
}
