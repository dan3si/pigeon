import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import Select from 'react-select'
import LoadingAnimation from '../../components/LoadingAnimation'
import cities from '../../data/cities'
import { API_URL } from '../../settings'
import styles from './AddRoute.module.scss'
import arrowIcon from '../../images/icons/arrow.png'

const AddRoute = () => {
    const citySelectOptions = cities.map(city => ({ value: city, label: city }))

    const [routeIsCreated, setRouteIsCreated] = useState(false)
    const [dataIsLoading, setDataIsLoading] = useState(false)

    const [from, setFrom] = useState(citySelectOptions[0])
    const [to, setTo] = useState(citySelectOptions[1])
    const [date, setDate] = useState('')
    const [dateHasErrors, setDateHasErrors] = useState(false)
    const [name, setName] = useState('')
    const [nameHasErrors, setNameHasErrors] = useState(false)
    const [telegram, setTelegram] = useState('')
    const [telegramHasErrors, setTelegramHasErrors] = useState(false)
    const [phone, setPhone] = useState('')
    const [phoneHasErrors, setPhoneHasErrors] = useState(false)
    const [note, setNote] = useState('')

    const checkDateHasErrors = () => {
        if (date === '') {
            return true
        }

        return false
    }

    const checkNameHasErrors = () => {
        if (name === '') {
            return true
        }

        return false
    }

    const checkTelegramHasErrors = () => {
        if (telegram === '') {
            return true
        }

        return false
    }

    const checkPhoneHasErrors = () => {
        if (phone === '') {
            return false
        } else if (phone.length < 10) {
            return true
        } else {
            return false
        }
    }

    const submitHandler = async () => {
        setDateHasErrors(checkDateHasErrors())
        setNameHasErrors(checkNameHasErrors())
        setTelegramHasErrors(checkTelegramHasErrors())
        setPhoneHasErrors(checkPhoneHasErrors())

        if (checkDateHasErrors() || checkNameHasErrors() || checkPhoneHasErrors() || checkTelegramHasErrors()) {
            return
        }

        setDataIsLoading(true)

        try {
            const res = await fetch(`${API_URL}/routes`, {
                method: 'POST',
                body: JSON.stringify({
                    from: from.value,
                    to: to.value,
                    date,
                    name,
                    telegram,
                    phone,
                    note
                }),
                headers: { 'Content-Type': 'application/json' }
            })

            const status = await res.text()

            if (status === 'success') {
                setRouteIsCreated(true)
            } else {
                throw new Error('Route was not created')
            }
        } catch {
            alert('Ошибка! Маршрут не был добавлен, попробуйте позже')     
        } finally {
            setDataIsLoading(false)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [routeIsCreated])

    if (dataIsLoading) {
        return (
            <div className={styles.addRoute}>
                <LoadingAnimation />
            </div>
        )
    }

    if (routeIsCreated) {
        return (
            <div className={styles.addRoute}>
                <div className={styles.succesInscription}>Спасибо, ваш маршрут добавлен!</div>

                <div className={styles.homeBtnWrapper}>
                    <Link to="/pigeon">
                        <button className={styles.homeBtn}>На главную</button>
                    </Link>
                </div>  
            </div>
        )
    }

    return (
        <div className={styles.addRoute}>
            <div className={styles.routeSelectsWrapper}>
                <div className={styles.inputWrapper}>
                    Откуда:
                    <Select
                        isSearchable
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
                        isSearchable
                        className={styles.routeSelect}
                        options={citySelectOptions}
                        placeholder="Город прибытия:"
                        value={to}
                        onChange={value => setTo(value)}
                    />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.inputWrapper}>
                    Выберите дату полёта:
                    <input
                        className={cn(styles.input, { [styles.inputError]: dateHasErrors })}
                        type="date"
                        value={date}
                        min={new Date().toJSON().slice(0,10)}
                        onChange={e => {
                            if (new Date(e.target.value).getTime() < Date.now() - 86400000) {
                                setDateHasErrors(true)
                                return
                            }

                            setDate(e.target.value)
                            setDateHasErrors(false)
                        }}
                    />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.inputWrapper}>
                    Ваше имя:
                    <input
                        className={cn(styles.input, { [styles.inputError]: nameHasErrors })}
                        placeholder="Имя:"
                        onChange={e => {
                            setName(e.target.value)
                            setNameHasErrors(false)
                        }}
                        value={name}
                    />
                </div>

                <div className={styles.inputWrapper}>
                    Ваш telegram nickname:
                    <input
                        className={cn(styles.input, { [styles.inputError]: telegramHasErrors })}
                        placeholder="@yournickname:"
                        onChange={e => {
                            setTelegram(e.target.value)
                            setTelegramHasErrors(false)
                        }}
                        value={telegram}
                    />
                </div>
                
                <div className={styles.inputWrapper}>
                    Ваш номер телефона (необязательно):
                    <input
                        className={cn(styles.input, { [styles.inputError]: phoneHasErrors })}
                        placeholder="Телефон*:"
                        onChange={e => {
                            for (const symbol of e.target.value) {
                                if (!'1234567890+()'.includes(symbol)) {
                                    return
                                }
                            }

                            if (e.target.value.length > 14) {
                                return
                            }

                            setPhone(e.target.value)
                            setPhoneHasErrors(false)
                        }}
                        value={phone}
                    />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.inputWrapper}>
                    Примечание (необязательно):
                    <textarea
                        rows="10"
                        className={styles.input}
                        placeholder="Примечание*:"
                        onChange={e => setNote(e.target.value)}
                        value={note}
                    ></textarea>
                </div>
            </div>

            <div className={styles.row}>
                <button
                    className={styles.submitBtn}
                    onClick={submitHandler}
                >
                    Создать
                </button>
            </div>
        </div>
    )
}

export default AddRoute
