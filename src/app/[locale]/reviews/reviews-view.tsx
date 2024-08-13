import HeroPages from '@components/hero-pages/hero-pages';
import styles from './reviews-view.module.scss';

const ReviewsView = () => {
    return (
        <div className={styles.container}>
            <HeroPages
                img_key='reviews'
                title='Отзывы'
            />
        </div>
    );
};

export default ReviewsView;
