const urlBase = process.env.NODE_ENV === "production" ? "" : "http://localhost:3001";

const Api = {
    get: async (path) => {
        return fetch(urlBase + path, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }            
        });
    },
    post: async (path, body) => {
        return fetch(urlBase + path, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: body
        });
    },
    handleError: resp => {
        if(!resp.ok) {
            throw Api.exception(resp.statusText, resp.status);
        }
        return resp;
    },    
    exception: (message, code) => {
        const error = new Error(message);
        error.code = code;
        return error;
    }
}

export default Api;