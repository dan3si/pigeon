import { useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import cities from '../../data/cities'

const AddRoute = () => {
    const citySelectOptions = cities.map(city => ({ value: city, label: city }))

    const [routeIsCreated, setRouteIsCreated] = useState(false)

    const [from, setFrom] = useState(citySelectOptions[0])
    const [to, setTo] = useState(citySelectOptions[1])
    const [date, setDate] = useState(null)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    if (routeIsCreated) {
        return (
            <div>
                <div>Спасибо, ваш маршрут добавлен!</div>
                <Link to="/">
                    <button>На главную</button>
                </Link>
            </div>
        )
    }

    return (
        <div>
            <div>
                <Select
                    options={citySelectOptions}
                    placeholder="Лечу из:"
                    value={from}
                    onChange={value => setFrom(value)}
                />
            </div>

            <div>
                <Select
                    options={citySelectOptions}
                    placeholder="Лечу в:"
                    value={to}
                    onChange={value => setTo(value)}
                />
            </div>

            <div>
                <input
                    type="date"
                    onChange={e => setDate(e.target.value)}
                />
            </div>

            <div>
                <input
                    placeholder="имя:"
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
            </div>

            <div>
                <input
                    placeholder="телефон:"
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                />
            </div>

            <div>
                <button
                    onClick={async () => {
                        const res = await fetch('http://localhost:80/addRoute', {
                            method: 'POST',
                            body: JSON.stringify({
                                from: from.value,
                                to: to.value,
                                date,
                                name,
                                phone
                            }),
                            headers: { 'Content-Type': 'application/json' }
                        })
                        const status = await res.text()

                        if (status === 'success') {
                            setRouteIsCreated(true)
                        }
                    }}
                >
                    Создать
                </button>
            </div>
        </div>
    )
}

export default AddRoute
