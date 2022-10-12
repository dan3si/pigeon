import styles from './Contacts.module.scss'

//import phoneIcon from '../../images/icons/phone.png'
import mailIcon from '../../images/icons/mail.png'
import instagramIcon from '../../images/icons/instagram.png'

const Contacts = () => {
    return (
        <div className={styles.contacts}>
            <div className={styles.contactsWrapper}>
                <a
                    href="mailto: dennis.priadka@gmail.com"
                    className={styles.contactLink}
                >
                    <img src={mailIcon} />
                    dennis.priadka@gmail.com
                </a>

                {/*<a
                    href="tel: +17865381388"
                    className={styles.contactLink}
                >
                    <img src={phoneIcon} />
                    +1 786 538 1388
                </a>*/}

                <a
                    href="https://www.instagram.com/dan3si/"
                    className={styles.contactLink}
                >
                    <img src={instagramIcon} />
                    @dan3si
                </a>
            </div>
        </div>
    )
}

export default Contacts
