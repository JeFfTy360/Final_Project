import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;  // ✔ Next.js way


const refreshAccessTokenIfNeeded = () => {
    // Retourne la promesse Axios
    return axios.post(
        `${API_URL}/token/refresh`,
        {},
        { withCredentials: true }
    )
        .then(() => {
            console.log("Access token rafraîchi !");
        })
        .catch((error) => {
            console.error("Impossible de rafraîchir le token :", error);
            // Option : rediriger vers login si refresh échoue
        });
};


const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})


// intercepteur pour verifier avant chaque requete

api.interceptors.request.use((config) => {
    return refreshAccessTokenIfNeeded().then(() => config);
});


export default api;