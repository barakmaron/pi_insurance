import formidable from 'formidable';
import emailDB from "../../../services/db/email";

export const config = {
    api: {
        bodyParser: false
    }
  };
  
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
    const form = new formidable.IncomingForm();
    return form.parse(req, async (err, fields, files) => { 
      try {
        const { error, data } = await emailDB.CreateRow({ 
            email: fields.email
        });
        if(!error) 
            return res.status(200).json();
        return res.status(400).json(error.message);
      } catch (error) {
        return res.status(500).json(error);  
      } 
    });
}

async function GetAllEmails(req, res) {
    try {
        const { error, data } = await emailDB.GetAll();
        if(!error) 
            return res.status(200).json(data);
        return res.status(400).json(error.message);
    } catch (err) {
        return req.status(400).json();
    }
}