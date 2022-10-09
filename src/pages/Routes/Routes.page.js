import { useEffect, useState } from 'react'
import { API_URL } from '../../settings'
import cities from '../../data/cities'
import Select from 'react-select'
import styles from './Routes.module.scss'
import arrowIcon from '../../images/arrow.png'

const Routes = () => {
    const citySelectOptions = [
        { value: '', label: 'Не выбрано' },
        ...cities.map(city => ({ value: city, label: city }))
    ]

    const [routes, setRoutes] = useState([])
    const [from, setFrom] = useState(citySelectOptions[0])
    const [to, setTo] = useState(citySelectOptions[0])

    const getRoutes = async () => {
        const res = await fetch(`${API_URL}/routes?from=${from.value}&to=${to.value}`)
        const data = await res.json()
        setRoutes(data)
    }

    useEffect(() => {
        getRoutes()
    }, [from, to])

    return (
        <div className={styles.routes}>
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

            <div className={styles.routesWrapper}>
                {routes.map(({ id, from, to, date, name, phone }) => (
                    <div key={id} className={styles.route}>
                        <div className={styles.row}>
                            <div className={styles.field}>Откуда: {from}</div>
                            <div className={styles.field}>Куда: {to}</div>
                        </div>
                        
                        <div className={styles.row}>
                            <div className={styles.field}>Дата: {date}</div>
                        </div>
                        
                        <div className={styles.row}>
                            <div className={styles.field}>Имя: {name}</div>
                            <div className={styles.field}>
                                <a
                                    href={'tel: ' + phone}
                                    className={styles.phoneLink}
                                >
                                    Телефон: {phone}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Routes
