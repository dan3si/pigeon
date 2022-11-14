import { useEffect, useState } from 'react'
import { API_URL } from '../../settings'
import cities from '../../data/cities'
import Select from 'react-select'
import LoadingAnimation from '../../components/LoadingAnimation'
import styles from './Routes.module.scss'
import arrowIcon from '../../images/icons/arrow.png'

const Routes = () => {
    const citySelectOptions = [
        { value: '', label: 'Не выбрано' },
        ...cities.map(city => ({ value: city, label: city }))
    ]

    const [routes, setRoutes] = useState([])
    const [routesAreLoading, setRoutesAreLoading] = useState(false)
    const [from, setFrom] = useState(citySelectOptions[0])
    const [to, setTo] = useState(citySelectOptions[0])

    const getRoutes = async () => {
        setRoutesAreLoading(true)

        try {
            const res = await fetch(`${API_URL}/routes?from=${from.value}&to=${to.value}`)
            const data = await res.json()
            setRoutes(data)
        } catch {
            alert('Ошибка! Не удалось загрузить маршруты, попробуйте позже')
        } finally {
            setRoutesAreLoading(false)
        }
    }

    const formatDate = (date) => {
        const months = {
            '01': 'января',
            '02': 'февраля',
            '03': 'марта',
            '04': 'апреля',
            '05': 'мая',
            '06': 'июня',
            '07': 'июля',
            '08': 'августа',
            '09': 'сентября',
            '10': 'октября',
            '11': 'ноября',
            '12': 'декабря',
        }

        const [year, month, day] = date.split('-')

        return `${day} ${months[month]} ${year}`
    }

    useEffect(() => {
        getRoutes()
    }, [from, to])

    if (routesAreLoading) {
        return (
            <div className={styles.routes}>
                <LoadingAnimation />
            </div>
        )
    }

    return (
        <div className={styles.routes}>
            <div className={styles.routeSelectsWrapper}>
                <div className={styles.inputWrapper}>
                    Откуда:
                    <Select
                        className={styles.routeSelect}
                        options={citySelectOptions}
                        placeholder="Город отправления:"
                        value={from}
                        onChange={value => setFrom(value)}
                    />
                </div>

                <div className={styles.routeArrowWrapper}>
                    <img
                        className={styles.routeArrow}
                        src={arrowIcon}
                    />
                </div>

                <div className={styles.inputWrapper}>
                    Куда:
                    <Select
                        className={styles.routeSelect}
                        options={citySelectOptions}
                        placeholder="Город прибытия:"
                        value={to}
                        onChange={value => setTo(value)}
                    />
                </div>
            </div>

            <div className={styles.routesWrapper}>
                {routes.map(({ id, from, to, date, name, telegram, phone, note }) => (
                    <div key={id} className={styles.route}>
                        <div className={styles.row}>
                            <div className={styles.field}>Откуда: {from}</div>
                            <div className={styles.field}>Куда: {to}</div>
                        </div>
                        
                        <div className={styles.row}>
                            <div className={styles.field}>Дата: {formatDate(date)}</div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>Имя: {name}</div>
                            <div className={styles.field}>
                                <a
                                    href={`https://t.me/${telegram?.replace(/@/, '')}`}
                                    className={styles.fieldLink}
                                    target="_blank"
                                >
                                    Telegram: {telegram}
                                </a>
                            </div> 
                        </div>

                        {phone !== '' && (
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <a
                                        href={`tel:  ${phone}`}
                                        className={styles.fieldLink}
                                    >
                                        Телефон: {phone}
                                    </a>
                                </div>
                            </div>
                        )}

                        {note !== '' && (
                            <div className={styles.row}>
                                <div className={styles.field}>Примечание: {note}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Routes
