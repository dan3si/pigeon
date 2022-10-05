import { useEffect, useState } from 'react'
import cities from '../../data/cities'
import Select from 'react-select'

const Routes = () => {
    const citySelectOptions = [
        { value: '', label: 'Не выбрано' },
        ...cities.map(city => ({ value: city, label: city }))
    ]

    const [routes, setRoutes] = useState([])
    const [from, setFrom] = useState(citySelectOptions[0])
    const [to, setTo] = useState(citySelectOptions[0])

    const getRoutes = async () => {
        const res = await fetch(`http://localhost:80/routes?from=${from.value}&to=${to.value}`)
        const data = await res.json()
        setRoutes(data)
    }

    useEffect(() => {
        getRoutes()
    }, [from, to])

    return (
        <div>
            <div>
                <Select
                    options={citySelectOptions}
                    placeholder="Город отправления:"
                    value={from}
                    onChange={value => setFrom(value)}
                />
            </div>

            <div>
                <Select
                    options={citySelectOptions}
                    placeholder="Город прибытия:"
                    value={to}
                    onChange={value => setTo(value)}
                />
            </div>


            {routes.map(({ id, from, to, date, name, phone }) => (
                <div key={id}>
                    <div>Откуда: {from}</div>
                    <div>Куда: {to}</div>
                    <div>Дата: {date}</div>
                    <div>Имя: {name}</div>
                    <div>Телефон: {phone}</div>
                    <br/>
                    <br/>
                </div>
            ))}
        </div>
    )
}

export default Routes
