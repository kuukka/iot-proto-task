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
    }
}

export default Api;