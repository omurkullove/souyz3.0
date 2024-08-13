import HeroPages from '@components/hero-pages/hero-pages';
import styles from './labor-center-view.module.scss';

const LaborCenterView = () => {
    return (
        <div className={styles.container}>
            <HeroPages
                img_key='labor-center'
                title='Трудовой центр'
            />
        </div>
    );
};

export default LaborCenterView;
