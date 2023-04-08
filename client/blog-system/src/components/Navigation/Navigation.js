import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import styles from './Navigation.module.css';

export function Navigation() {
    const { openLoginDialog } = useAuthContext();

    return (
        <div className={styles.container}>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Link className={styles.button} to="/">Home</Link>
                <Button onClick={openLoginDialog}>Login</Button>
                <Button>Register</Button>
            </Stack>
        </div>
    );

}