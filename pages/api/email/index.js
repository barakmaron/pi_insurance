import { supabaseAdmin } from "../../../services/ApiService";

export default function handler(req, res) {
    const { method } = req;
    switch(method) {
        case "GET": {
            return GetAllEmails(req, res);
        }
        case "POST": {
            return AddEmail(req, res);
        }
        default: {
            res.status(404).json();
        }
    }
}

async function AddEmail(req, res) {
    try {
        const { email } = req.body;
        const { error, data } = await supabaseAdmin.from('emails').insert({
            email
        });
        if(!error) 
            return res.status(200).json();
        return res.status(400).json(error.message);
    } catch (err) {
        return req.status(400).json();
    }
}

async function GetAllEmails(req, res) {
    try {
        const { error, data } = await supabaseAdmin.from('emails').select();
        if(!error) 
            return res.status(200).json(data);
        return res.status(400).json(error.message);
    } catch (err) {
        return req.status(400).json();
    }
}