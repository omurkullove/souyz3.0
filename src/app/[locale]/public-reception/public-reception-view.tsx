import HeroPages from '@components/hero-pages/hero-pages';
import styles from './public-reception-view.module.scss';

const PublicReceptionView = () => {
    return (
        <div className={styles.container}>
            <HeroPages
                img_key='public-reception'
                title='Общественная приемная'
            />
        </div>
    );
};

export default PublicReceptionView;
