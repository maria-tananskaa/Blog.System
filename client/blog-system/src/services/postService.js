import * as requester from './requester';
const baseUrl = 'http://localhost:3030/data/posts';

export async function getAll() {
    const sortParams = encodeURIComponent("_createdOn desc");
    const result = await requester.get(`${baseUrl}?sortBy=${sortParams}`);
    const posts = Object.values(result);

    return posts;
}

export async function getMyPosts(userId) {
    const searchQuery = encodeURIComponent(`_ownerId="${userId}"`);
    const result = await requester.get(`${baseUrl}?where=${searchQuery}`);
    const posts = Object.values(result);

    return posts;
}

export async function getOne(postId) {
    const post = await requester.get(`${baseUrl}/${postId}`);
    return post;
}

export async function create(data) {
    const post = await requester.post(baseUrl, data);
    return post;
}

export async function edit(data, postId) {
    const post = await requester.put(`${baseUrl}/${postId}`, data);
    return post;
}

export async function remove(postId) {
    await requester.remove(`${baseUrl}/${postId}`);
}
