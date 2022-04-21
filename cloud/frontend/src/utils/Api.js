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
    post: async (path, body, headers) => {
        const head = {
            ...headers,
            'Content-Type': 'application/json'
        }
        return fetch(urlBase + path, {
            method: 'POST',
            headers: head,
            body: body
        });
    },
    put: async (path, body, headers) => {
        const head = {
            ...headers,
            'Content-Type': 'application/json'
        }

        return fetch(urlBase + path, {
            method: 'PUT',
            headers: head,
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