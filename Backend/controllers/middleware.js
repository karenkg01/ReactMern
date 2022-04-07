

module.exports.loginRequired = (req, res, next) => {
        try{
            //console.log(req.headers.authorization)
           
            // if (!req?.headers?.authorization) return res.status(401).text('invalid token');
            const token = req.headers.authorization.split(' ')[1]
            console.log("token", token)
           const decoded =  jwt.verify(token, process.env.TOKEN_SECRET)
           
           console.log("decoded: ", decoded)

           user = UserModel.findOne({_id: decoded._id})

           if (!user) return res.status('403').json('authorized');

           req.user = user 
           
           next();
        }catch(err){
           return res.status(401).json({ message: 'invalid token!' });
        }
}

module.exports.adminRequired = (req, res, next) => {
    if (req.headers.authorization) {
        try{
           const decoded =  jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET)
           if(decoded.isAdmin){
               next();
           }else{
            res.status(401).json({ message: 'unauthorized user!' });
            return false;
           }
        }catch(err){
            res.status(401).json({ message: 'invalid token!' });
        }
        next();//go to the next link in the chain of routes
    } else {
        res.status(401).json({ message: 'Unauthorized Admin user!' });
    }
   
}