import { Link } from 'react-router-dom'
import logo from '../../images/logo.jpg'
import styles from './Header.module.scss'

const Header = () => {
    return (
        <header className={styles.header}>
            <Link to='/'>
                <img
                    src={logo}
                    className={styles.logo}
                />
            </Link>
        </header>
    )
}

export default Header
