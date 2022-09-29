import { supabaseAdmin } from '../ApiService';

async function GetAll(){
    try{
        return await supabaseAdmin.from('blogs').select();
    } catch(err) {
        throw err;
    }
}

async function GetLastChangeBlogId() {
    try{
        const { error, data } = await supabaseAdmin.from('blogs').select().order('updated_at', {
            ascending: false
        });
        if(error)
            throw error;
        return data[0].id;
    } catch(err) {
        throw err;
    }
}

const blogsDB = {
    GetAll,
    GetLastChangeBlogId
};

export default blogsDB;