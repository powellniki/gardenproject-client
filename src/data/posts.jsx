import { fetchWithResponse } from "./fetcher.jsx";

export function getPosts() {
    return fetchWithResponse(`posts`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export function getPostById(id) {
    return fetchWithResponse(`posts/${id}`, {
        Authorization: `Token ${localStorage.getItem('token')}`
    })
}

export function addPost(post) {
    return fetchWithResponse(`posts`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
}

export function editPost(post) {
    return fetchWithoutResponse(`posts/${post.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })
}