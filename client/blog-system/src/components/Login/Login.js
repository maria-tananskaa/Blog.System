import { useState } from "react";
import { Button, Dialog, DialogTitle, FormControl, Stack, TextField } from "@mui/material";

export function Login() {

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.id]: e.target.value }))
    };

    return (
        <Dialog open={true}>
            <DialogTitle>Login</DialogTitle>
            <FormControl sx={{ margin: '2em' }}>
                <Stack spacing={2}>
                    <TextField
                        id="email"
                        label="Email"
                        value={values.email}
                        onChange={onChangeHandler}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={onChangeHandler}
                    />
                    <Stack spacing={2} direction="row">
                        <Button>Login</Button>
                        <Button>Cancel</Button>
                    </Stack>
                </Stack>
            </FormControl>
        </Dialog>
    );
}