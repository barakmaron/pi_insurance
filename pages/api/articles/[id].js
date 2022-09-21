import { supabaseAdmin } from '../../../services/ApiService';

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
  const {error, data: articles} = await supabaseAdmin.from('blogs').select();
  if(!error) {
    const filtered = articles.filter((article) => article.id === id);

    if (filtered.length > 0) {
      return res.status(200).json(filtered[0]);
    }
  } else {
    return res
      .status(404)
      .json({ message: `Article with the id of ${id} is not found` })
  }
}


async function DeleteArticle(req, res) {
  try {
    const { id } = req.query;
    const { error, data } = await supabaseAdmin.from('blogs').delete().match({ 
      id
    });
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
    const { error, data } = await supabaseAdmin.from('blogs').update({
      body
    }).match({ 
      id
    });
    if(!error)
      return res.status(200).json();
    return res.status(500).json(error.message);
  } catch (err) {
    return res.status(400).json(err.message);
  }
}