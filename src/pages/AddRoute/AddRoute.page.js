import { useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import cities from '../../data/cities'
import { API_URL } from '../../settings'
import styles from './AddRoute.module.scss'
import arrowIcon from '../../images/arrow.png'

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
            <div className={styles.addRoute}>
                <div>Спасибо, ваш маршрут добавлен!</div>
                <Link to="/">
                    <button>На главную</button>
                </Link>
            </div>
        )
    }

    return (
        <div className={styles.addRoute}>
            <div className={styles.routeSelectsWrapper}>
                <Select
                    className={styles.routeSelect}
                    options={citySelectOptions}
                    placeholder="Город отправления:"
                    value={from}
                    onChange={value => setFrom(value)}
                />

                <div className={styles.routeArrowWrapper}>
                    <img
                        className={styles.routeArrow}
                        src={arrowIcon}
                    />
                </div>

                <Select
                    className={styles.routeSelect}
                    options={citySelectOptions}
                    placeholder="Город прибытия:"
                    value={to}
                    onChange={value => setTo(value)}
                />
            </div>

            <div className={styles.row}>
                <input
                    className={styles.input}
                    type="date"
                    onChange={e => setDate(e.target.value)}
                />
            </div>

            <div className={styles.row}>
                <input
                    className={styles.input}
                    placeholder="Имя:"
                    onChange={e => setName(e.target.value)}
                    value={name}
                />

                <input
                    className={styles.input}
                    placeholder="Телефон:"
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                />
            </div>

            <div className={styles.row}>
                <button
                    className={styles.submitBtn}
                    onClick={async () => {
                        const res = await fetch(`${API_URL}/addRoute`, {
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
