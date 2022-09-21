import Constants from "../Constants";
import jwt from 'jsonwebtoken';

function GenerateToken(user_id) {
    const base_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    return jwt.sign({
        id: user_id
    }, base_token, { 
        expiresIn: Constants.TOKEN_MAX_AGE
    });
}

function Verify(token) {
    return jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN);
}

const AuthService = { 
    GenerateToken,
    Verify
};

export default AuthService;