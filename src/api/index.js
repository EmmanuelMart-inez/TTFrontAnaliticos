import axios from "axios";
import _ from "lodash";

export const bubbletownApi = axios.create({
    baseURL: "http://127.0.0.1:5001/"
});

export const fetchData = _.memoize( async (endpoint) => {
    const res = await bubbletownApi.get(`${endpoint}`);
    return res.data;
});