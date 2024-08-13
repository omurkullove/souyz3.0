import HeroPages from '@components/hero-pages/hero-pages';
import styles from './faq-view.module.scss';

const FaqView = () => {
    return (
        <div className={styles.container}>
            <HeroPages
                img_key='faq'
                title='Часто задаваемые вопросы'
            />
        </div>
    );
};

export default FaqView;
