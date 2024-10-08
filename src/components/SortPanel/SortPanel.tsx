export function SortPanel({ setSortCriterion }: any) {

    return (
        <form>
            <div>
                <legend>Сортировать</legend>
                <label htmlFor='lowToHigh'>
                    <input
                    type="radio"
                    name='sort'
                    id="lowToHigh"
                    value='lowToHigh'
                    onChange={(event) => setSortCriterion(event.target.value)}
                    ></input>
                    по возрастанию цены
                </label>
            </div>
            <div>
                <label htmlFor='highToLow'>
                    <input
                    type="radio"
                    name="sort"
                    id="highToLow"
                    value='highToLow'
                    onChange={(event) => setSortCriterion(event.target.value)}
                    ></input>
                    по убыванию цены
                </label>
            </div>
            <div>
                <label htmlFor="duration">
                    <input
                    type="radio"
                    name="sort"
                    id="duration"
                    value='duration'
                    onChange={(event => setSortCriterion(event.target.value))}
                    ></input>
                    по времени в пути
                </label>
            </div>
        </form>
    )
}