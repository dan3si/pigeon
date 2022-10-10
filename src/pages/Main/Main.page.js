import { Link } from 'react-router-dom'
import styles from './Main.module.scss'
import contactsIcon from '../../images/icons/mail.png'

const Main = () => {
    return (
        <div className={styles.page}>
            <Link to="/pigeon/contacts" className={styles.contactsLink}>
                <div className={styles.contactsWrapper}>
                    <img
                        className={styles.contactsIcon}
                        src={contactsIcon}
                    />
                    Контакты
                </div>
            </Link>

            <Link to="/pigeon/add_route">
                <button className={styles.flyBtn}>Я лечу</button>
            </Link>

            <Link to="/pigeon/routes">
                <button className={styles.sendPackageBtn}>Я отправляю посылку</button>
            </Link>
        </div>
    )
}

export default Main
