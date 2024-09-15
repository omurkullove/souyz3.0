'use client';

import { ReactNode } from 'react';
import styles from './layout.module.scss';

import { Toaster } from 'react-hot-toast';
import { Footer } from './footer';
import { Header } from './header';
import { Sidebar } from './sidebar';

interface ILayoutProps {
    children: ReactNode;
    mode: ModeType;
}

const Layout = ({ children, mode }: ILayoutProps) => {
    return (
        <div className={styles.container}>
            <Toaster position='bottom-right' />

            <aside className={styles.aside}>
                <Sidebar mode={mode} />
            </aside>
            <div className={styles.children}>
                <header className={styles.header}>
                    <Header mode={mode} />
                </header>
                <main>{children}</main>
                <footer className={styles.footer}>
                    <Footer />
                </footer>
            </div>
        </div>
    );
};

export default Layout;
