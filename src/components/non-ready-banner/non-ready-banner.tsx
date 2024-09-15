import WithAnimate from '@components/animation/with-animate';
import { withTranslate } from '@i18n/withTranslate';
import Image from 'next/image';
import styles from './non-ready-banner.module.scss';

interface IProps {
    translated: IntlMessages['NonReadyBanner'];
}

const NonReadyBanner = ({ translated }: IProps) => {
    return (
        <WithAnimate
            type='both'
            to='up'
            triggerInView={false}
        >
            <div className={styles.container}>
                <Image
                    src='/images/dev-process.png'
                    width={350}
                    height={300}
                    alt='Процесс разработки'
                    className={styles.image}
                />
                <p className={styles.title}>{translated.title}</p>
            </div>
        </WithAnimate>
    );
};

export default withTranslate(NonReadyBanner, ['NonReadyBanner']);
