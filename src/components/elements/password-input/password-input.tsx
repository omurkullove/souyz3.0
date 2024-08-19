import { FC, InputHTMLAttributes, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import styles from './password-input.module.scss';

const PasswordInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const [isHidden, setIsHidden] = useState(true);

    return (
        <div className={styles.container}>
            <input
                {...props}
                className={`${styles.input} ${props.className}`}
                type={isHidden ? 'password' : 'text'}
            />

            {!isHidden ? (
                <FaRegEye
                    className={styles.icon}
                    onClick={() => setIsHidden(true)}
                />
            ) : (
                <FaRegEyeSlash
                    className={styles.icon}
                    onClick={() => setIsHidden(false)}
                />
            )}
        </div>
    );
};

export default PasswordInput;
