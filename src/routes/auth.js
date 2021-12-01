const router = require("express").Router()
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv").config()
const JWTVerify =  require('../middleware/JWTVerify')
const User = require("../models/User")
const bcrypt = require("bcrypt");



router.get("/", JWTVerify, (req,res)=>{

    if(req.user.id === '618a049c3053249d13097cb2'){
        res.status(200).json('hola jefe')
    } else{
        res.status(200).json(' NO jefe')

    }
})

const generateAccessToken = (user) =>{
    //Generate Access token
    return jwt.sign({id:user._id}, process.env.JWT_KEY,{expiresIn: "24h"})
   

}

const generateRefreshToken = (user) =>{
      
    return jwt.sign({id:user._id}, process.env.JWT_KEY_REFRESH)
  
}


router.post('/login', async (req,res) =>{

    
    const {email, password } = req.body

   

    //search user
    const user = await User.findOne({email:email })
    
    if(user){

        //comparing hashed password with req body password
            const result = await bcrypt.compare(password, user.password);
            
            
            if(result){
                console.log('password comparision', result)
                
                const accessToken = generateAccessToken(user)
                const refreshToken = generateRefreshToken(user)
        
                await User.findByIdAndUpdate(user._id, {$push: {refreshTokens: refreshToken}})
                
                res.json({
                    username:user.username,
                    id:user._id,
                    accessToken,
                    refreshToken
                })
               
            } else{
                
                res.status(400).json('username or password are incorrect')

            }
        
    }else{
        
        res.status(400).json('username or passowrd incorrect')
    }

     

})


router.post('/refresh', async (req,res)=>{
    //take refresh token from the user
    const refreshToken = req.body.token
    const userId = req.body.id
    const userDB = await User.findById(userId)
    let newRefreshTokens = userDB.refreshTokens

    //send error if there s no token or its invalid
    if(!refreshToken) return res.status(401).json('you are not authenticated')
    if(!userDB.refreshTokens.includes(refreshToken)){
        return res.status(403).json("refresh token is invalid")
    }

    jwt.verify(refreshToken, process.env.JWT_KEY_REFRESH, async (err,user)=>{
        err && console.log(err);
        
        //eliminating used refresh token
        newRefreshTokens = newRefreshTokens.filter((token) => token !== refreshToken)
        //upading array
        await User.findByIdAndUpdate(userId,{refreshTokens:newRefreshTokens})

        //generating both tokens

        const newAccessToken = await generateAccessToken(userDB)
        const newRefreshToken = await generateRefreshToken(userDB)


        //adding new refresh token array in User object
        await User.findByIdAndUpdate(userId, {$push: {refreshTokens: newRefreshToken}})

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })

    })
    //if everything ok, create new access token


})


router.post('/logout', JWTVerify, async (req,res)=>{
    const userId = req.user.id
    const user = await User.findById(userId)
    
    const refreshToken = req.body.token
    let refreshTokens = user.refreshTokens
    
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
    
    await User.findByIdAndUpdate(userId, {refreshTokens: refreshTokens})
    res.status(200).json('you logged out successfully')
    await localStorage.removeItem("user")

   

})





module.exports = router;