import { useState } from "react";
import { Button, Dialog, DialogTitle, FormControl, Stack, TextField } from "@mui/material";
import { useAuthContext } from "../../contexts/AuthContext";

export function Register() {
    const { registerIsOpen, closeRegisterDialog, onRegisterSubmit } = useAuthContext()
    const [values, setValues] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.id]: e.target.value }))
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onRegisterSubmit(values);
    }

    return (
        <Dialog open={registerIsOpen}>
            <DialogTitle>Register</DialogTitle>
            <form method="POST" onSubmit={onSubmit}>
                <FormControl sx={{ margin: '2em' }}>
                    <Stack spacing={2}>
                        <TextField
                            id="firstName"
                            label="First Name"
                            value={values.firstName}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            id="lastName"
                            label="Last Name"
                            value={values.lastName}
                            onChange={onChangeHandler}
                        />
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
                            <Button type="submit" >Register</Button>
                            <Button onClick={closeRegisterDialog}>Cancel</Button>
                        </Stack>
                    </Stack>
                </FormControl>
            </form>

        </Dialog>
    )
}