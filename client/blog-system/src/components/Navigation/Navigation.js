import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import styles from './Navigation.module.css';

export function Navigation() {
    const { openLoginDialog, openRegisterDialog, onLogout, accessToken } = useAuthContext();

    return (
        <div className={styles.container}>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Link className={styles.button} to="/">Home</Link>
                {!accessToken && (
                    <div>
                        <Button  onClick={openLoginDialog}>Login</Button>
                        <Button  onClick={openRegisterDialog}>Register</Button>
                    </div>

                )}
                {accessToken && (
                    <div>
                        <Link className={styles.button} to="/createPost">Create Post</Link>
                        <Button onClick={onLogout}>Logout</Button>
                    </div>
                )}

            </Stack>
        </div>
    );

}