import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import getConfig from 'next/config';
const { publicRuntimeConfig: config } = getConfig();

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
const options = {
    schema: 'public',
    headers: { 'x-my-custom-header': 'my-app-name' },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  };

export const supabaseAdmin = createClient(
    config.app.NEXT_PUBLIC_SUPBASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options
);


export const ImageLoader = ({ src }) => {
    const encoded = Buffer.from(src).toString('base64');
    return `/api/file/${encoded}`;
}
