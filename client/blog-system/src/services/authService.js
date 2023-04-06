import * as requester from "./requester";

const baseUrl = "http://localhost:3030/users";

export async function login(data) {
    const response = await requester.post(`${baseUrl}/login`, data);
    return response;
}

export async function logout() {
    await requester.get(`${baseUrl}/logout`);
}

export async function register(data) {
    const response = await requester.post(`${baseUrl}/register`, data);
    return response;
}
