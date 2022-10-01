import axios from 'axios';


export default async function SendApiRequest(url, method = "get", params = undefined) {
    try {
        axios.defaults.withCredentials = true;
        const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await axios[method](`${base_url}${url}`, params);
        return res.data;
    } catch (err) {
        throw err;
    }
}
