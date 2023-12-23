import axios, {CancelToken} from "axios";

const baseURL = `https://api.github.com/search/repositories`
export const API = {
    getRep(value: string, token: CancelToken) {
        return axios.get(`${baseURL}?q=${value}&per_page=10`, {cancelToken: token})
    },
};