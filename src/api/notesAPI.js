import FetchPromise from "./FetchPromise";

export function getList(filename) {
    return FetchPromise({
        url: window["config"].apiUrl + "File/GetList?name=" + filename,
        method: "GET",
    });
}

export function createList(filename) {
    return FetchPromise({
        url: window["config"].apiUrl + "File/CreateList?name=" + filename,
        method: "GET",
    });
}

export function listFiles() {
    return FetchPromise({
        url: window["config"].apiUrl + "File/ListFiles",
        method: "GET",
    });
}

export function saveItem(file, title, body) {
    return FetchPromise({
        url: window["config"].apiUrl + "File/SaveItem",
        method: "POST",
        body: {
            File: file,
            Title: title,
            Body: body,
        },
    });
}

export function editItem(id, file, title, body) {
    return FetchPromise({
        url: window["config"].apiUrl + "File/EditItem",
        method: "POST",
        body: {
            Id: id,
            File: file,
            Title: title,
            Body: body,
        },
    });
}

export function reorderItem(file, currentPos, newPos) {
    return FetchPromise({
        url: window["config"].apiUrl + "File/ReorderItem",
        method: "POST",
        body: {
            File: file,
            CurrentPos: currentPos,
            NewPos: newPos,
        },
    });
}

export function deleteItem(id, file) {
    return FetchPromise({
        url: window["config"].apiUrl + "File/DeleteItem",
        method: "DELETE",
        body: {
            Id: id,
            File: file,
        },
    });
}

export function deleteList(filename) {
    return FetchPromise({
        url: window["config"].apiUrl + "File/DeleteList?name=" + filename,
        method: "DELETE",
    });
}
