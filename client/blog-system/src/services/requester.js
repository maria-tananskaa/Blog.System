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

    const result = await response.json();

    return result;
}

export const get= (url)=> request('GET',url);
export const post= (url,data)=> request('POST',url,data);
export const put= (url,data)=> request('PUT',url,data);
export const remove= (url,data)=> request('DELETE',url,data);