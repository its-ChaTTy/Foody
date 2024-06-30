import React from 'react';
import Menu from '../../components/Menu/Menu';
import styles from '../../styles/routes/menu.css';
import Navbar from '../../components/Navbar/Navbar';
import { CartProvider } from '@/context/cart.context';

export default function MenuPage() {
    return (
        <>
            <CartProvider>
                <Navbar />
                <div className={styles.App}>
                    <Menu />
                </div>
            </CartProvider>
        </>
    );
}

export async function getServerSideProps(context) {
    if (!context.req.session || !context.req.session.user) {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/login",
            },
            props: {},
        };
    }

    if (context.req.session.user.role !== 'CUSTOMER') {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/login",
            },
            props: {},
        };
    }

    return {
        props: {
            user: context.req.session.user,
        },
    };
}