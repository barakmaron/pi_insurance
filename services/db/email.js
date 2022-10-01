import supabaseAdmin from "./index";


async function GetAll() {
    try {
        return await supabaseAdmin.from('emails').select();
    } catch (err) {
        throw err;
    }
}

async function CreateRow(fields) {
    try {
        return await supabaseAdmin.from('emails').insert(fields);
    } catch(err) {
        throw err;
    }
}

const emailDB = {
    CreateRow,
    GetAll
};

export default emailDB;