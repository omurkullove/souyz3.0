import styles from './service.module.scss';

interface IServiceProps {
    translated: IntlMessages['Home']['Service'];
}

const Service = ({ translated }: IServiceProps) => {
    return (
        <div className={styles.container}>
            <section className={styles.section_left}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{translated.title}</h3>
                    <p className={styles.subtitle}>{translated.subtitle}</p>
                </div>
                <div className={styles.big_title}>
                    <span>S</span>
                    <span>O</span>
                    <span>Y</span>
                    <span>U</span>
                    <span>Z</span>

                    <span>.</span>
                    <span>K</span>
                    <span>G</span>
                </div>
            </section>
            <section className={styles.section_right}>
                <div className={styles.child}>
                    <h5 className={styles.title}>{translated.enterprise.title}</h5>
                    <p className={styles.text}>{translated.enterprise.text}</p>
                </div>
                <div className={styles.line} />
                <div className={styles.child}>
                    <h5 className={styles.title}>{translated.tourism.title}</h5>
                    <p className={styles.text}>{translated.tourism.text}.</p>
                </div>
                <div className={styles.line} />
                <div className={styles.child}>
                    <h5 className={styles.title}>{translated.conclusion.title}</h5>
                    <p className={styles.text}>{translated.conclusion.text}</p>
                </div>
            </section>
        </div>
    );
};

export default Service;
