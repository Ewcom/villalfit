const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt");





router.get('/', async (req, res) => {

    const allUsers = await User.find()
    res.status(200).json(allUsers)

})

router.post('/new', async (req, res) => {


   

    let newUser = new User

    try {
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        
        //create hash password and sending user info to client
        (async () => {
            const hashedPassword = await bcrypt.hash(req.body.password, 5);
            newUser.password = hashedPassword


            try{
                await newUser.save()
                res.status(201).json(newUser)

            }catch(e){
                res.status(400).json('errrorrr')
            }
          
            
           
        })()
        
        
        

    } catch (e) {
        console.log(e)
        res.status(401).json(e)

    }

})



router.post('/check_email', async (req,res)=>{

    const user = await User.findOne({email:req.body.email})

    if(user){
        res.status(200).json(user.email)
    } else{
        res.status(200).json(null)

    }
    

})

module.exports = router;
