import { Link } from 'react-router-dom'
import styles from './Main.module.scss'

const Main = () => {
    return (
        <div className={styles.page}>
            <Link to="/add_route">
                <button className={styles.flyBtn}>Я лечу</button>
            </Link>

            <Link to="/routes">
                <button className={styles.sendPackageBtn}>Я хочу передать посылку</button>
            </Link>
        </div>
    )
}

export default Main
