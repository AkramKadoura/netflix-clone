import Card from "./card";
import styles from './cards-section.module.css';

const CardsSection = (props) => {
    const { title, videos = [], size } = props
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.cardWrapper}>
                {videos.map((videos, idx) => {
                    return (
                        <Card id={idx} imgUrl={videos.imgUrl} size={size} />
                    );
                })
                }

            </div>
        </section>
    );
}

export default CardsSection;