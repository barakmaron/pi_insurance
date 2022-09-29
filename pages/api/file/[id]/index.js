import fs from 'fs';
import { supabaseAdmin } from '../../../../services/ApiService';
import nc from 'next-connect';
import UploadImageMiddleware from '../../../../middleware/UploadImageMiddleware';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from '../../../../services/Cloudinary';
import formidable from 'formidable';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
    api: {
        bodyParser: false
    }
};

async function  AddImage(req, res) {
    const { id } = req.query;
    const form = new formidable.IncomingForm();
    return await form.parse(req, async (err, fields, files) => { 
      try {
        const image_path = files.file.filepath;
        const image_url = await uploadImage(image_path);
        await insertToBD(image_url, id);
        return res.status(201).json({ uploaded: true });
      } catch (error) {
        return res.status(500).json(error);  
      } 
    });
}

const insertToBD = async (file, id) => { 
    await supabaseAdmin.from('blogs').update([{
       image: file,
    }]).match({
        id
    });
};


async function uploadImage(file) {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      const result = await cloudinary.uploader.upload(file, options);
      return result.secure_url;
    } catch (error) {
      console.error(error);
    }
}

async function handler(req, res) {
    const { method } = req;
  switch (method){
    case "POST": {
      return AddImage(req, res);
    }
    default: {
      return res.status(404).json();
    }
  }
}

export default handler;