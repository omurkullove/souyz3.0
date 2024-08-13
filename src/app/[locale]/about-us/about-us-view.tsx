import HeroPages from '@components/hero-pages/hero-pages';
import styles from './about-us-view.module.scss';

const AboutUsView = () => {
    return (
        <div className={styles.container}>
            <HeroPages
                title='О компании Souyz.kg'
                img_key='about-us'
            />
        </div>
    );
};

export default AboutUsView;
