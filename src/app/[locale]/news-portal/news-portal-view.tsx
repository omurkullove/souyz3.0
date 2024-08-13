import HeroPages from '@components/hero-pages/hero-pages';
import styles from './news-portal-view.module.scss';

const NewsPortalView = () => {
    return (
        <div className={styles.container}>
            <HeroPages
                title='Новостной портал'
                img_key='news-portal'
            />
            <div className={styles.content}>
                <h1 className={styles.title}>Последние новости</h1>
            </div>
        </div>
    );
};

export default NewsPortalView;
