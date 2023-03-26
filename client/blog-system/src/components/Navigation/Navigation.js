import {  Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
export function Navigation() {
    return (
        <div className={styles.container}>
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
            >
                <Button><Link className="button" to="/">Home</Link></Button>
            </Stack>
        </div>
    );

}