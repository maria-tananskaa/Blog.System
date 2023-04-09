import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import styles from './Navigation.module.css';
import { Fragment } from 'react';

export function Navigation() {
    const { openLoginDialog, openRegisterDialog, onLogout, accessToken } = useAuthContext();

    return (
        <div className={styles.container}>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
            >
                <Link className={styles.button} to="/">Home</Link>
                {!accessToken && (
                    <Fragment>
                        <button className={styles.button} onClick={openLoginDialog}>Login</button>
                        <button className={styles.button} onClick={openRegisterDialog}>Register</button>
                    </Fragment>

                )}
                {accessToken && (
                    <Fragment>
                        <Link className={styles.link} to="/createPost">Create Post</Link>
                        <button className={styles.button} onClick={onLogout}>Logout</button>
                    </Fragment>
                )}
            </Stack>
        </div>
    );

}