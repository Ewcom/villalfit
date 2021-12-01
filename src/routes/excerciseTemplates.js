const router = require("express").Router()
const ExcerciseTemplate = require("../models/ExcerciseTemplate")



router.get('/', (req, res) => {

    console.log('api')


})


router.get('/listoftemplates', async (req, res) => {

    try {

        //TODO PONER QUE BUSQUE SOLAMENTE ID DEL USUARIO QUE BUSQUE NE LUGAR DE BUSCAR  //  onwer: { $in: req.body.ownerId}
        const listOfTemplates = await ExcerciseTemplate.find()
        res.status(200).json(listOfTemplates)

    } catch (e) {
        res.status(500).json(e)
    }

})


//TODO GET REQUEST BUSCAR MATCHES EN NOMBRES DE LOS TEMPLATES PARA SEARCH BAR
router.get('/searchTemplates/:name', async (req,res) =>{

    try {

        const templateSearch = await ExcerciseTemplate.find({ name: { $in: req.params.name} })

        
        if(templateSearch==''){
            res.status(404).json('Template wasnt found')
        } else{
            res.status(200).json(templateSearch)

        }

    } catch (e) {
        res.status(500).json(e)
    }
})






//CREATE 
router.post('/new', async (req, res) => {


    let newExcerciseTemplate = new ExcerciseTemplate;

    try {

        
        newExcerciseTemplate.name = req.body.name
        newExcerciseTemplate.picture = req.body.picture

        await newExcerciseTemplate.save()
        res.status(201).json(newExcerciseTemplate)

    } catch (e) {
        console.log(e)
        res.status(400).json(e)

    }

})






module.exports = router;
