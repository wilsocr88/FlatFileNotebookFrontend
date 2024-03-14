import FetchPromise from "./FetchPromise";

export function login(user, pass) {
    return FetchPromise({
        url: window["config"].apiUrl + "Auth/Login",
        method: "POST",
        body: {
            user: user,
            pass: pass,
        },
    });
}

export function checkAuth() {
    return FetchPromise({
        url: window["config"].apiUrl + "Auth/CheckAuth",
        method: "GET",
    });
}

export function createUser(user, pass) {
    return FetchPromise({
        url: window["config"].apiUrl + "Auth/CreateUser",
        method: "POST",
        body: {
            user: user,
            pass: pass,
        },
    });
}
