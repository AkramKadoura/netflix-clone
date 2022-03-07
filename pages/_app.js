import { useEffect, useState } from 'react'
import '../styles/globals.css'
import { magic } from '../lib/magic-client';
import { useRouter } from 'next/router';
import Loading from '../components/loading/loading'

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    try {
      const loggedIn = await magic.user.isLoggedIn();
      if (loggedIn) {
        router.push('/');
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error directing to netflix clone', error);
    }

  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    }

    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };

  }, [router])

  return isLoading ? <Loading /> : <Component {...pageProps} />
}

export default MyApp
