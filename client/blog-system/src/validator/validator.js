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

export function validateConfirmPassword(password, confirmPassword) {
    let errorMessage = "";

    if (password !== confirmPassword) {
        errorMessage = "Confirm Password should be equel to password";
    }

    return errorMessage;
}

export function validateTitle(title) {
    let errorMessage = "";

    if (title.length < 3) {
        errorMessage = "Title should be more than 3 characters";
    }

    return errorMessage;
}

export function validateImageUrl(url) {
    let errorMessage = "";

    if (url.length < 10) {
        errorMessage = "Invalid URL";
    }

    return errorMessage;
}

export function validateDescription(description) {
    let errorMessage = "";

    if (description.length < 20) {
        errorMessage = "Description should be more than 20 characters";
    }

    return errorMessage;
}

export function validateContent(content) {
    let errorMessage = "";

    if (content.length < 100) {
        errorMessage = "Post content should be more than 100 characters";
    }

    return errorMessage;
}
