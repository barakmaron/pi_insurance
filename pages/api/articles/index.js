import formidable from 'formidable';
import blogsDB from '../../../services/db/blogs';

export const config = {
  api: {
      bodyParser: false
  }
};

export default function handler(req, res) {
  const { method } = req;
  switch (method){
    case "GET": {
      return GetAllArticles(req, res);
    }
    case "POST": {
      return AddNewArticle(req, res);
    }
    default: {
      return res.status(404).json();
    }
  }
}

async function GetAllArticles(req, res) {
  try {
    const {error, data: articles} = await blogsDB.GetAll();
    if(!error)
      return res.status(200).json(articles);
    return res.status(500).json(error);
  } catch (err) {
    return res.status(400).json();
  }
}


async function AddNewArticle(req, res) {
  try {
    const form = new formidable.IncomingForm();
    return form.parse(req, async (err, fields, files) => { 
      try {
        const { error, data } = await blogsDB.CreateBlog(fields.title, fields.hash_tag);
        if(!error)
          return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json(error);  
      } 
    });
  } catch (err) {
    return res.status(400).json(err);
  }
}