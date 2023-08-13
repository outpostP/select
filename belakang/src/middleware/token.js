const jwt = require('jsonwebtoken');

const loginToken = (req, res, next) => {
    let token = req.headers.authorization;
    const verifier = process.env.JWT_KEY_LOGIN
    if (!token) return res.status(401).send('no token')
    
    try{
        token = token.split(' ')[1];
        if (token === 'null' || !token) {
            return res.status(401).send('denied')
        };
        let verifiedUser = jwt.verify(token, verifier );
        if (!verifiedUser) {
            return res.status(401).send('illegal unverified')
        }
        if(!verifiedUser.isVerified) {
            return res.status(401).send('unverified account')
        }
        req.user = verifiedUser;
        next();
    }
    catch(err){
        return res.status(400).send('invalid token')
    };
};

const profileToken = (req,res,next) => {
    let token = req.headers.authorization;
    const verifier = process.env.JWT_KEY
    if (!token) return res.status(401).send('no token')
    
    try{
        token = token.split(' ')[1];
        if (token === 'null' || !token) {
            return res.status(401).send('denied')
        };
        let verifiedUser = jwt.verify(token, verifier );
        if (!verifiedUser) {
            return res.status(401).send('illegal unverified')
        }
        if(!verifiedUser.isVerified) {
            return res.status(401).send('unverified account')
        }
        req.user = verifiedUser;
        next();
    }
    catch(err){
        return res.status(400).send('invalid token')
    };
}


module.exports = loginToken;