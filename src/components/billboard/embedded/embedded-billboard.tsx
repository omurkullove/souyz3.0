import { FC } from 'react';
import styles from '../billboard.module.scss';

interface IProps {}

const EmbeddedBillboard: FC<IProps> = ({}) => {
    return <div className={styles.embedded_container}>EmbeddedBillboard</div>;
};

export default EmbeddedBillboard;
