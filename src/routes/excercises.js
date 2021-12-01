const router = require("express").Router()
const JWTVerify = require("../middleware/JWTVerify")
const Excercise = require("../models/Excercise")



router.get('/', (req, res) => {

    console.log('api')


})


//FETCH LIST OF EXCERCIES
router.post('/listofexcercises', async (req, res) => {

    try {

        const listOfExcercises = await Excercise.find({ _id: { $in: req.body.ids } })
        res.send(listOfExcercises)

    } catch (e) {
        res.status(500).json(e)
    }

})

//EDIT EXCERCISE
router.post('/edit/:id', JWTVerify, async (req, res) => {

    //verification of data
    let bodyIsValid = true

    //array verification
    if(req.body.repetitions && (req.body.repetitions.length <1 || req.body.repetitions.length >8)){bodyIsValid = false}
    
    //weight verification
    if(req.body.weight<1 || req.body.weight>10000) {bodyIsValid = false }

    if (bodyIsValid) {

        try {

            const foundExcercise = await Excercise.findById(req.params.id)


            if (!foundExcercise) {
                res.status(404).json('excercise not found')
            } else {

                if (req.user.id === foundExcercise.owner) {
                    //actual code for modyifing
                    console.log('editing...')


                    await Excercise.findByIdAndUpdate(req.params.id, req.body)
                    res.status(204).json('excercise edited!')




                } else {
                    res.status(403).json(' you are not allowed to edit this excercise')
                }


            }


        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }

    } else{
        res.status(400).json('invalid request')
    }

})

//NEW EXCERCISE
router.post('/new', JWTVerify, async (req, res) => {


    let newExcercise = new Excercise;

    try {

        newExcercise.owner = req.user.id
        newExcercise.name = req.body.name
        newExcercise.excerciseId = req.body.excerciseId
        newExcercise.repetitions = req.body.repetitions
        newExcercise.weight = req.body.weight
        newExcercise.picture = req.body.picture

        await newExcercise.save()
        res.status(201).json(newExcercise)

    } catch (e) {
        console.log(e)
        res.status(400).json(e)

    }

})

//READ EXCERCISE
router.get('/search/:id', async (req, res) => {

    try {


        const excerciseToFind = await Excercise.findById(req.params.id)
        res.status(200).json(excerciseToFind)
    } catch (e) {
        res.status(500).json(e)
        console.log(e)
    }

})


//DELETE
router.delete('/:id', JWTVerify, async (req, res) => {





    try {

        const foundExcercise = await Excercise.findById(req.params.id)

        if (foundExcercise.owner === req.user.id) {




            await Excercise.findByIdAndDelete(req.params.id)
            res.status(200).json(`item ${req.params.id} has been deleted`)
        } else {
            res.status(403).json('you are not allowed to delete this excercise')
        }

    } catch (e) {
        res.status(500).json(e)
    }




})



//find VARIOUS IDS






module.exports = router;
