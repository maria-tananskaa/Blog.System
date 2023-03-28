const baseUrl = 'http://localhost:3030/jsonstore/posts';

export async function getAll() {
    const response = await fetch(baseUrl, { method: 'GET' });
    const result = await response.json();
    const posts = Object.values(result);

    return posts;
}

export async function getOne(postId) {
    const response = await fetch(`${baseUrl}/${postId}`, { method: 'GET' });
    const post = await response.json();

    return post;
}
