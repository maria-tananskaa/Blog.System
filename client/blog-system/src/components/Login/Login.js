import { useState } from "react";
import { Button, Dialog, DialogTitle, FormControl, Stack, TextField } from "@mui/material";
import { useAuthContext } from "../../contexts/AuthContext";
import * as validator from "../../validator/validator";

export function Login() {
    const { loginIsOpen, closeLoginDialog, onLoginSubmit } = useAuthContext()
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.id]: e.target.value }))
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onLoginSubmit(values);
    }

    const validateForm = () => {
        let currentErrors = {};
        let formIsValid = true;
        const emailValidationMessage = validator.validateEmail(values.email);
        const passwordValidationMessage = validator.validatePassword(values.password);


        if (emailValidationMessage) {
            currentErrors.emailError = emailValidationMessage;
            currentErrors.isEmailError = true;
            formIsValid = false;
        }

        if (passwordValidationMessage) {
            currentErrors.passwordError = passwordValidationMessage;
            currentErrors.isPasswordError = true;
            formIsValid = false;
        }

        setErrors(currentErrors);
        return formIsValid;
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
                            error={errors.isEmailError}
                            helperText={errors.emailError}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            value={values.password}
                            onChange={onChangeHandler}
                            error={errors.isPasswordError}
                            helperText={errors.passwordError}
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
