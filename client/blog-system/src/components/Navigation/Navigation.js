import {  Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

export function Navigation() {
    return (
        <div className={styles.container}>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Link className={styles.button} to="/">Home</Link>
            </Stack>
        </div>
    );

}