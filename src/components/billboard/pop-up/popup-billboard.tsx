import { FC } from 'react';
import styles from '../billboard.module.scss';

interface IProps {}

const PopupBillboard: FC<IProps> = ({}) => {
    return <div className={styles.popup_container}>PopupBillboard</div>;
};

export default PopupBillboard;
