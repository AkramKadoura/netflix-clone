import styles from './navbar.module.css';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { magic } from '../../lib/magic-client';


const Navbar = () => {
    // const { username } = props;

    const [showDropDown, setShowDropDown] = useState(false);
    const [username, setUsername] = useState('');

    const router = useRouter()

    const handleOnClickHome = (e) => {
        e.preventDefault();
        router.push('/');
    }

    const handleOnClickMyList = (e) => {
        e.preventDefault();
        router.push('/browse/my-list');
    }

    const handleShowDropDown = (e) => {
        e.preventDefault();
        setShowDropDown(!showDropDown);
    }

    const handleSignout = async (e) => {
        e.preventDefault();
        try {
            await magic.user.logout();
            console.log(await magic.user.isLoggedIn()); // => `false`
            router.push('/login');
        } catch (error) {
            console.error('Error logging out', error);
            router.push('/login');
        }
    }

    useEffect(async () => {
        try {
            const { email } = await magic.user.getMetadata();
            if (email) {
                setUsername(email);
            }
        } catch (error) {
            console.error('Error getting email', error)
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <a className={styles.logoLink} href="/">
                    <div className={styles.logoWrapper}>
                        <Image
                            src="/static/netflix.svg"
                            alt="Netflix logo"
                            width="128px"
                            height="34px"
                        />
                    </div>
                </a>

                <ul className={styles.navItems}>
                    <li className={styles.navItem} onClick={handleOnClickHome}>
                        Home
                    </li>
                    <li className={styles.navItem2} onClick={handleOnClickMyList}>
                        My List
                    </li>
                </ul>
                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn} onClick={handleShowDropDown}>
                            <p className={styles.username}>{username}</p>
                            {/** Expand more icon */}
                            <Image
                                src={"/static/expand_more.svg"}
                                alt="Expand dropdown"
                                width="24px"
                                height="24px"
                            />
                        </button>

                        {showDropDown && (
                            <div className={styles.navDropdown}>
                                <div>

                                    <a className={styles.linkName} onClick={handleSignout}>
                                        Sign out
                                    </a>

                                    <div className={styles.lineWrapper}></div>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;