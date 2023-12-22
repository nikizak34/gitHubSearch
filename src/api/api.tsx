import axios from "axios";

const baseURL= `https://api.github.com/search/repositories`
export const API = {
    getRep(value:string) {
        return axios.get(`${baseURL}?q=${value}&per_page=10`)
    },
};