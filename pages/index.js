import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/banner/banner'
import Card from '../components/card/card'
import CardsSection from '../components/card/cards-section'
import Navbar from '../components/nav/navbar'
import styles from '../styles/Home.module.css'
import { getPopularVideos, getVideos } from '../lib/videos'
import { magic } from '../lib/magic-client';

export async function getServerSideProps() {
  const disneyVideos = await getVideos('disney trailer');
  const fashionVideos = await getVideos('fashion');
  const travelVideos = await getVideos('travel');
  const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      fashionVideos,
      travelVideos,
      popularVideos,
    }
  }
}

export default function Home({ disneyVideos, fashionVideos, travelVideos, popularVideos }) {

  console.log({ magic });

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <Navbar username='akram@live.com' />

        <Banner
          videoId='4zH5iYM4wJo'
          title='Clifford the red dog'
          subtitle='a very cute dog'
          imgUrl='/static/clifford.webp'
        />

        <div className={styles.sectionWrapper}>
          <CardsSection title='Disney' videos={disneyVideos} size='large' />
          <CardsSection title='Travel' videos={travelVideos} size='small' />
          <CardsSection title='Fashion' videos={fashionVideos} size='medium' />
          <CardsSection title='Popular' videos={popularVideos} size='small' />
        </div>
      </div>
    </div>
  )
}
