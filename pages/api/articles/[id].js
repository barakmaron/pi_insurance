import { supabaseAdmin } from '../../../services/ApiService';
import blogsDB from '../../../services/db/blogs';

export default function handler(req,  res) {

  const { method } = req;

  switch(method){
    case "GET": {
      return GetArticle(req, res);
    }
    case "DELETE": {
      return DeleteArticle(req, res);
    }
    case "PATCH": {
      return EditArticle(req, res);
    }
    default: {
      return res.status(404).json();
    }
  }
}

async function GetArticle(req, res) {
  const { id } = req.query;
  const {error, data: articles} = await blogsDB.GetAll();
  if(!error) {
    const filtered = articles.find((article) => article.id === id);
    if (filtered) {
      return res.status(200).json(filtered);
    }
    return res.status(404).json({ message: `Article with the id of ${id} is not found` })
  } else {
    return res.status(404).json({ message: `Article with the id of ${id} is not found` })
  }
}


async function DeleteArticle(req, res) {
  try {
    const { id } = req.query;
    const { error, data } = await blogsDB.DeleteArticle(id);
    if(!error)
      return res.status(200).json();
    return res.status(500).json(error.message);
  } catch (err) {
    return res.status(400).json(err.message);
  }
}

async function EditArticle(req, res) {
  try {
    const { id } = req.query;
    const { body } = req.body;
    const { error, data } = await blogsDB.UpdateBlog({ body }, id);
    if(!error)
      return res.status(200).json();
    return res.status(500).json(error.message);
  } catch (err) {
    return res.status(400).json(err.message);
  }
}