import React, { ReactNode } from 'react';
import styles from './auth-layout.module.scss';

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return <div className={styles.container}>{children}</div>;
};

export default AuthLayout;
