import supabaseAdmin from './index';

async function GetAll(){
    try{
        return await supabaseAdmin.from('blogs').select();
    } catch(err) {
        throw err;
    }
}

async function GetBlogById(id) {
    try {
        return await supabaseAdmin.from('blogs').select().match({
            id
        });
    } catch (err) {
        throw err;
    }
}

async function GetLastChangeBlog() {
    try{
        const { error, data } = await supabaseAdmin.from('blogs').select().order('updated_at', {
            ascending: false
        });
        if(error)
            throw error;
        return data[0];
    } catch(err) {
        throw err;
    }
}

async function UpdateBlog(fields, id) {
    try {
        return await supabaseAdmin.from('blogs').update(fields).match({
            id
         });
    } catch (err) {
        throw err;
    }
}

async function CreateBlog(title, hash_tag) {
    try {
        return await supabaseAdmin.from('blogs').insert({
            title,
            hash_tag,
            body: ""
        });
    } catch (err) {
        throw err;
    }
}

async function DeleteArticle(id) {
    try {
        return await supabaseAdmin.from('blogs').delete().match({ 
            id
        });
    } catch (err) {
        throw err;
    }
}

const blogsDB = {
    GetAll,
    GetLastChangeBlog,
    GetBlogById,
    UpdateBlog,
    CreateBlog,
    DeleteArticle
};

export default blogsDB;