const jwt = require('jsonwebtoken')


module.exports = function(req,res,next) {
    const authHeader = req.headers.authorization
    
    if(authHeader){
        const token = authHeader.split(" ")[1]//BEARER SPLIT
        
      

        jwt.verify(token, process.env.JWT_KEY, (err,user)=>{

           
            if(err){
               
                return res.status(403).json("token is not valid")
            } 
            
             
            req.user = user
            next()
        })
    } else{
        res.status(401).json("you are not authenticated")
    }
}