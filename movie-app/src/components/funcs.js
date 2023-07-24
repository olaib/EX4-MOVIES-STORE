exports.status = (response) => {
    if (response.status === 404) return Promise.reject(new Error("404 Not Found"));
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return response.text().then(errorMessage =>
            Promise.reject(new Error(errorMessage))
        );
    }
};

exports.json = (response) => response.json();

exports.handleError = (error, setMsg) => setMsg(error.message);

