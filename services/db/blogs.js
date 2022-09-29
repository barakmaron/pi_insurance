import { supabaseAdmin } from '../ApiService';

async function GetAll(){
    try{
        return await supabaseAdmin.from('blogs').select();
    } catch(err) {
        throw err;
    }
}

const blogsDB = {
    GetAll
};

export default blogsDB;