import fs from 'fs';
import { supabaseAdmin } from '../../../../services/ApiService';
import formidable from 'formidable';


export const config = {
    api: {
        bodyParser: false
    }
};


export default async function handler(req, res) {
   switch(req.method) {
        case "GET": {
            return getImage(req, res);
        }
        case "POST": {
            return post(req, res);
        }
        default: {
            return res.status(404).json({});
            break;
        }
   }
}

async function getImage(req, res) {
    const { id: file_location } = req.query;
    const decoded = decode_file_location(file_location);
    try {
    const img = await fs.readFileSync(decoded);
    res.setHeader('Content-Type', 'image/png');
    res.send(img);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

function decode_file_location(id){
    return Buffer.from(id, 'base64').toString();
}


const post = async (req, res) => {
    const { id } = req.query;
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        try {
            await saveFile(files.file, id);
            await insertToBD(files.file, id);
            return res.status(201).json({ uploaded: true });
        } catch (err) {
            return res.status(500).json({ failed: true });
        }
    });
};

const insertToBD = async (file, id) => { 
    await supabaseAdmin.from('blogs').update([{
       image: `./public/blog_images/${id}_${file.originalFilename}`,
    }]).match({
        id
    });
};

const saveFile = async (file, id) => {
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`./public/blog_images/${id}_${file.originalFilename}`, data);
    await fs.unlinkSync(file.filepath);
};