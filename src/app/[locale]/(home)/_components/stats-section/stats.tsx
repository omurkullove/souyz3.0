'use client';

import WithAnimate from '@components/animation/with-animate';
import styles from './stats.module.scss';

interface IStatsProps {
    translated: IntlMessages['Home']['Stats'];
}

const Stats = ({ translated }: IStatsProps) => {
    return (
        <WithAnimate
            type='both'
            to='up'
        >
            <div className={styles.container}>
                <div className={styles.key_stat}>
                    <p className={styles.value}>54</p>
                    <p className={styles.title}>{translated.direction}</p>
                </div>

                <div className={styles.key_stat}>
                    <p className={styles.value}>2</p>
                    <p className={styles.title}>{translated.office}</p>
                </div>

                <div className={styles.key_stat}>
                    <p className={styles.value}>15</p>
                    <p className={styles.title}>{translated.years}</p>
                </div>

                <div className={styles.key_stat}>
                    <p className={styles.value}>35 000</p>
                    <p className={styles.title}>{translated.users}</p>
                </div>
            </div>
        </WithAnimate>
    );
};

export default Stats;
