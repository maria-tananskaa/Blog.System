import { useState } from "react";
import { Button, Dialog, DialogTitle, FormControl, Stack, TextField } from "@mui/material";
import { useAuthContext } from "../../contexts/AuthContext";
import * as validator from "../../validator/validator";

export function Register() {
    const { registerIsOpen, closeRegisterDialog, onRegisterSubmit } = useAuthContext();
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.id]: e.target.value }))
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password
        };

        onRegisterSubmit(data);
    }

    const validateForm = () => {
        let currentErrors = {};
        let formIsValid = true;
        const firstNameErrorMessage = validator.validateName(values.firstName);
        const lastNameErrorMessage = validator.validateName(values.lastName);
        const emailErrorMessage = validator.validateEmail(values.email);
        const passwordErrorMessage = validator.validatePassword(values.password);
        const confirmPasswordErrorMessage = validator.validateConfirmPassword(values.password, values.confirmPassword);

        if (firstNameErrorMessage) {
            currentErrors.firstNameError = firstNameErrorMessage;
            currentErrors.isFirstNameError = true;
            formIsValid = false;
        }

        if (lastNameErrorMessage) {
            currentErrors.lastNameError = lastNameErrorMessage;
            currentErrors.isLastNameError = true;
            formIsValid = false;
        }


        if (emailErrorMessage) {
            currentErrors.emailError = emailErrorMessage;
            currentErrors.isEmailError = true;
            formIsValid = false;
        }

        if (passwordErrorMessage) {
            currentErrors.passwordError = passwordErrorMessage;
            currentErrors.isPasswordError = true;
            formIsValid = false;
        }

        if (confirmPasswordErrorMessage) {
            currentErrors.confirmPasswordError = confirmPasswordErrorMessage;
            currentErrors.isConfirmPasswordError = true;
            formIsValid = false;
        }

        setErrors(currentErrors);
        return formIsValid;
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
                            error={errors.isFirstNameError}
                            helperText={errors.firstNameError}
                        />
                        <TextField
                            id="lastName"
                            label="Last Name"
                            value={values.lastName}
                            onChange={onChangeHandler}
                            error={errors.isLastNameError}
                            helperText={errors.lastNameError}
                        />
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
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={values.confirmPassword}
                            onChange={onChangeHandler}
                            error={errors.isConfirmPasswordError}
                            helperText={errors.confirmPasswordError}
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