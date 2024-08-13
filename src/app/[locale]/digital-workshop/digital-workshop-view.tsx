import HeroPages from '@components/hero-pages/hero-pages';
import styles from './digital-workshop-view.module.scss';

const DigitalWorkshopView = () => {
    return (
        <div className={styles.container}>
            <HeroPages
                img_key='digital-workshop'
                title='Цифровая мастерская'
            />
        </div>
    );
};

export default DigitalWorkshopView;
