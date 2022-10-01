import AuthService from "../../../../services/AuthService";
import { serialize } from 'cookie';
import userDB from "../../../../services/db/user";

export default async function handleLogin(req, res) {
    const { method } = req;
    switch (method){
        case "POST": {
           return await Login(req, res);
        }
        case "GET": {
            return CheckToken(req, res);
        }
        default: {
            return res.status(404).json();
          }
    }
}

async function Login(req, res) {
    const { email, password } = req.body;
    try{
        const { data, error } = await userDB.FindUserByEmail(email);
        if(!error && data.length) {
            const [{ email: email_db, password: password_db, id }] = data;
            if(AuthService.CheckUserCredentials(email, password, email_db, password_db)) {
                const access_token = AuthService.GenerateToken(id);
                if(access_token) {
                    return res.setHeader('Set-Cookie', 
                        serialize('jwt', access_token, { 
                            path: '/',
                            httpOnly: true
                        })).status(200).json();
                }                
            }
            return res.status(401).json();
        }        
    } catch (err) {
        return res.status(400).json();
    }
}

function CheckToken(req, res) {
    try {
        const token = req.cookies.jwt;
        if(!token)
            return res.status(401).json();
        const user_id = AuthService.Verify(token);
        return res.status(200).json();
    } catch (err) {
        return res.status(403).json();
    }
}        
