import { supabaseAdmin } from '../../../services/ApiService';

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
    const {error, data: articles} = await supabaseAdmin.from('blogs').select();
    if(!error)
      return res.status(200).json(articles);
    return res.status(500).json(error);
  } catch (err) {
    return res.status(400).json();
  }
}

async function AddNewArticle(req, res) {
  try {
    const { title, hash_tag } = req.body;
    const { error, data } = await supabaseAdmin.from('blogs').insert({
      title,
      hash_tag,
      body: "{}"
    });
    if(!error)
      return res.status(200).json(data);
    return res.status(500).json(error);
  } catch (err) {
    return res.status(400).json();
  }
}
