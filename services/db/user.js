import supabaseAdmin from ".";

async function FindUserByEmail(email) {
    try {
        return await supabaseAdmin.from('user').select().match({
            email
        });
    } catch (err) {
        throw err;
    }
}

const userDB = {
    FindUserByEmail
};

export default userDB;