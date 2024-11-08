import styles from './SidePanel.module.css';
import { ExtractedFlightData, SidePanelProps } from '../../types';


export function SidePanel({ setFilter, filterConnections, filterAirlines, flights }: SidePanelProps) {

    let bestAirlineOffers: Map<string, ExtractedFlightData> = new Map();
    for (let item of flights) {
        if (!bestAirlineOffers.has(item.carrier.uid)) {
            bestAirlineOffers.set(item.carrier.uid, item);
        } else {
            if ((bestAirlineOffers.get(item.carrier.uid)!.price.amount)! > item.price.amount) {
                bestAirlineOffers.set(item.carrier.uid, item);
            }
        }
    };

    const entries = bestAirlineOffers.entries();

    return (
        <div className={styles.panel}>
            <form className={styles.form}>
                <div>
                    <div className={styles.legend}>Сортировать</div>
                    <label htmlFor='lowToHigh'>
                        <input
                            type="radio"
                            name='sort'
                            id="lowToHigh"
                            value='lowToHigh'
                            onChange={(event) => setFilter({ sort: event.target.value })} />
                        - по возрастанию цены
                    </label>
                </div>
                <div>
                    <label htmlFor='highToLow'>
                        <input
                            type="radio"
                            name="sort"
                            id="highToLow"
                            value='highToLow'
                            onChange={(event) => setFilter({ sort: event.target.value })} />
                        - по убыванию цены
                    </label>
                </div>
                <div>
                    <label htmlFor="duration">
                        <input
                            type="radio"
                            name="sort"
                            id="duration"
                            value='duration'
                            onChange={(event) => setFilter({ sort: event.target.value })} />
                        - по времени в пути
                    </label>
                </div>
            </form>

            <form className={styles.form}>
                <div className={styles.legend}>Фильтровать</div>
                <div>
                    <label htmlFor="1">
                        <input
                            type="checkbox"
                            name="stops"
                            id="1"
                            value='1'
                            onChange={(event) =>
                                filterConnections('oneConnection')
                            } />
                        - 1 пересадка
                    </label>
                </div>
                <div>
                    <label htmlFor="0">
                        <input
                            type="checkbox"
                            name="stops"
                            id='0'
                            value='0'
                            onChange={(event) => {
                                filterConnections('direct')
                            }} />
                        - без пересадок
                    </label>
                </div>
            </form>

            <form className={styles.form}>
                <div className={styles.legend}>Цена</div>
                <div className={styles.priceRange}>
                    <div>от</div>
                    <input
                        type='number'
                        onChange={(event) => setFilter({ priceFrom: Number(event.target.value) })}
                    />
                </div>
                <div className={styles.priceRange}>
                    <div>до</div>
                    <input
                        type='number'
                        onChange={(event) => setFilter({ priceTo: Number(event.target.value) })} />
                </div>
            </form>

            <form className={styles.form}>
                <div className={styles.legend}>Авиакомпании</div>
                <div>
                    {[...entries].map(([key, value]: [string, ExtractedFlightData]) =>
                        <div key={key}>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    name='airlines'
                                    id='airlines'
                                    value={key}
                                    onChange={(event) => filterAirlines(key)} />
                                {value.carrier.caption} от {value.price.amount} р.
                            </label>
                        </div>)}
                </div>
            </form>
        </div>

    )
}