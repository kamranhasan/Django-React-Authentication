export function checkToken() {
    return localStorage.getItem('token') ? true :  false 
}

export function setToken(token) {
    return localStorage.setItem('token', token) 
}

export function getToken() {
    return localStorage.getItem('token') 
}

export function setUser(user) {
    localStorage.setItem('email', user.email);
    localStorage.setItem('username', user.username)
}