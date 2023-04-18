export function validateEmail(email) {
    let errorMessage = "";
    if (!email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        errorMessage = "Invalid email";
    }

    return errorMessage;
}

export function validatePassword(password) {
    let errorMessage = "";

    if (password.length < 6) {
        errorMessage = "Password could not  be less than 6 symbols";
    }

    return errorMessage;
}

export function validateName(name) {
    let errorMessage = "";

    if (name.length < 3) {
        errorMessage = "Name should be more than 3 charаcters";
    }

    return errorMessage;
}

export function validateConfirmPassword(password,confirmPassword) {
    let errorMessage = "";

    if (password!==confirmPassword) {
        errorMessage = "Confirm Password should be equel to password";
    }

    return errorMessage;
}