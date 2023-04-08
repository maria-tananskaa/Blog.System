async function request(method, url, data) {
    const options = {};

    options.method = method;

    if (method !== "GET" && data) {
        options.headers = {
            'content-type': 'application/json',
        };

        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (response.status === 204) {
        return {};
    }

    if (response.status >= 400) {
        const error = await response.json();
        throw error;
    }


    return await response.json()


}

export const get = (url) => request('GET', url);
export const post = (url, data) => request('POST', url, data);
export const put = (url, data) => request('PUT', url, data);
export const remove = (url, data) => request('DELETE', url, data);
