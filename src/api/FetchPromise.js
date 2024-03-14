// eslint-disable-next-line no-unused-vars
const FetchPromiseParams = {
    url: String,
    method: String,
    body: Object || null,
    respType: String || null,
};

/**
 * @param {FetchPromiseParams} params
 * @returns {FetchPromise} A promise with a .cancel() method which calls AbortController.abort()
 */
export default function FetchPromise(params) {
    const controller = new AbortController();
    const signal = controller.signal;
    const promise = new Promise(async function (resolve, reject) {
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
        };
        await fetch(params.url, {
            method: params.method,
            signal,
            headers,
            body: JSON.stringify(params.body),
        })
            .then(response => {
                if (response.status === 401) {
                    reject({ reason: "Unauthorized", details: response });
                }
                if (!response.ok) {
                    throw Error(response);
                }
                if (params.respType === "raw") {
                    return response.blob();
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject({ reason: "Unknown", details: error });
            });
    });
    promise.cancel = () => controller.abort();
    return promise;
}
