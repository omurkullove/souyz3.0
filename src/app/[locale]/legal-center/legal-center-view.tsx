import HeroPages from '@components/hero-pages/hero-pages';
import styles from './legal-center-view.module.scss';

const LegalCenterView = () => {
    return (
        <div className={styles.container}>
            <HeroPages
                img_key='legal-center'
                title='Правовой центр'
            />
        </div>
    );
};

export default LegalCenterView;
