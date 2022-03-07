import { magic } from "../lib/magic-client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from '../styles/Login.module.css';
import { route } from "next/dist/server/router";
import { useEffect } from "react";

const Login = () => {

    const [email, setEmail] = useState('');
    const [validationMsg, setValidationMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const handleComplete = () => {
            setIsLoading(false);
        }

        router.events.on('routeChangeComplete', handleComplete);

        return () => {
            router.events.off('routeChangeComplete', handleComplete);
        };

    }, [router])

    const handleOnChangeEmail = (e) => {
        setValidationMsg('');
        const email = e.target.value;
        setEmail(email);
    }

    const handleLoginWithEmail = async (e) => {
        e.preventDefault();
        if (email) {
            if (email === 'akramkaddoura1995@gmail.com') {
                try {
                    setIsLoading(true);
                    const didToken = await
                        magic.auth.loginWithMagicLink({
                            email,
                        });

                    console.log(didToken);

                    if (didToken) {
                        router.push('/');
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.error('Something went wrong while loggin in', error);
                }
            }
            else {
                setIsLoading(false);
                setValidationMsg('Email address not found');
            }
        }
        else {
            setIsLoading(false);
            setValidationMsg('Enter a valid email address');
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Netflix Sign In</title>
            </Head>
            <header className={styles.header}>
                <div className={styles.headerWrapper}>
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
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <h1 className={styles.signInHeader}>Sign In</h1>
                    <input type='text' placeholder="Email Address" className={styles.emailInput} onChange={handleOnChangeEmail} />
                    <p className={styles.userMsg}>{validationMsg}</p>
                    <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </button>
                </div>
            </main>

        </div>
    );
}

export default Login;

