import { useState } from "react";
import { Button, Dialog, DialogTitle, FormControl, Stack, TextField } from "@mui/material";
import { useAuthContext } from "../../contexts/AuthContext";

export function Login() {
    const { loginIsOpen, closeLoginDialog, onLoginSubmit } = useAuthContext()
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.id]: e.target.value }))
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onLoginSubmit(values);
    }

    return (
        <Dialog open={loginIsOpen}>
            <DialogTitle>Login</DialogTitle>
            <form method="POST" onSubmit={onSubmit}>
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
                            <Button type="submit" >Login</Button>
                            <Button onClick={closeLoginDialog}>Cancel</Button>
                        </Stack>
                    </Stack>
                </FormControl>
            </form>

        </Dialog>
    );
}
