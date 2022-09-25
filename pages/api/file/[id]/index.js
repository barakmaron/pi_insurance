import fs from 'fs';
import { supabaseAdmin } from '../../../../services/ApiService';
import nc from 'next-connect';
import UploadImageMiddleware from '../../../../middleware/UploadImageMiddleware';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
    api: {
        bodyParser: false
    }
};


async function getImage(req, res) {
    const { id: file_location } = req.query;
    const decoded = decode_file_location(file_location);
    try {
        const img = await fs.readFileSync(`./Images/${decoded}`);
        res.setHeader('Content-Type', 'image/png');
        res.send(img);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

function decode_file_location(id){
    return Buffer.from(id, 'base64').toString();
}


async function  AddImage(req, res) {
    const { id } = req.query;
    const image_path = req.file.filename;
    try {
        await insertToBD(image_path, id);
        return res.status(201).json({ uploaded: true });
    } catch (err) {
        return res.status(500).json({ failed: true });
    }
}

const insertToBD = async (file, id) => { 
    await supabaseAdmin.from('blogs').update([{
       image: file,
    }]).match({
        id
    });
};

const saveFile = async (file, id) => {
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`./public/blog_images/${id}_${file.originalFilename}`, data);
    await fs.unlinkSync(file.filepath);
};

const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end();
    },
    onNoMatch: (req, res) => {
        res.status(404).end();
    }
}).use(bodyParser.json())
.use(bodyParser.urlencoded())
.use(UploadImageMiddleware)
.post(AddImage)
.get(getImage);

export default handler;