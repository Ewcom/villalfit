const router = require("express").Router()
const Routine = require("../models/Routine")
const Excercise = require("../models/Excercise")
const JWTVerify = require('../middleware/JWTVerify')
const User = require("../models/User")
const { findByIdAndDelete } = require("../models/User")





//FETCH LIST OF ROUTINES
router.get('/listofroutines', async (req, res) => {

    try {

        //TODO PONER QUE BUSQUE SOLAMENTE ID DEL USUARIO QUE BUSQUE NE LUGAR DE BUSCAR TODO //  onwer: { $in: req.body.ownerId}
        const listofroutines = await Routine.find()

        res.status(200).json(listofroutines)


    } catch (e) {
        res.status(500).json(e)
    }

})

//FETCH LIST OF ROUTINES
router.get('/my_routines', JWTVerify, async (req, res) => {

    const currentUserId = req.user.id
    try {


        const myRoutines = await Routine.find({ owner: currentUserId })

        res.status(200).json(myRoutines)



    } catch (e) {
        res.status(500).json(e)
    }

})


//RENAME
router.post('/rename/:id', JWTVerify, async (req, res) => {


    try {

        const foundRoutine = await Routine.findById(req.params.id)
        
        
        if (foundRoutine) {

            if (foundRoutine.owner === req.user.id) {
                await Routine.findByIdAndUpdate(req.params.id, {name:req.body.newName})
                res.status(204).json('routine Renamed')
            } else {
                res.status(403).json('you are not allowed to rename this routine')
            } 

        } else {

            res.status(404).json('routine not found')
        }


    } catch (e) {

        res.status(500).json('error looking for routine or user')
    }

})



//GET EXCERCISES INFO FROM ROUTINE ID

router.get('/excercisesinfo/:id1', async (req, res) => {


    try {

        const routineInfo = await Routine.findById(req.params.id1)

        const listOfExcercises = await Excercise.find({ _id: { $in: routineInfo.excercises } })
        res.send(listOfExcercises)



    } catch (e) {
        res.status(500).json(e)
    }
})





//CREATE ROUTINE
router.post('/new', JWTVerify, async (req, res) => {

    let newRoutine = new Routine

    try {
        newRoutine.name = req.body.name
        newRoutine.excercises = req.body.excercises
        newRoutine.owner = req.user.id

        await newRoutine.save()
        res.status(201).json(newRoutine)


    } catch (e) {
        console.log(e)
        res.status(400).json(e)

    }

})

//GET ROUTINE BY ID
router.get('/:id', async (req, res) => {



    try {
        const foundRoutine = await Routine.findById(req.params.id)

        if (foundRoutine) {
            res.status(200).json(foundRoutine)
        } else {
            res.status(404).json('routine not found by ID')
        }
    } catch (e) {
        res.status(500).json(e)
    }

})

//GET ROUTINE BY ID AND APPEND EXCERCISE
router.post('/:id/:excerciseId', async (req, res) => {



    const excerciseId = req.params.excerciseId



    try {
        

        const foundRoutine = await Routine.findByIdAndUpdate(req.params.id, { $push: { excercises: excerciseId } })
        if (foundRoutine) {


            res.status(200).json(foundRoutine)


        } else {
            res.status(404).json('routine not found by ID')
        }
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }

})

//delete routine by id
router.delete('/:id', JWTVerify, async (req, res) => {

    try {

        const foundRoutine = await Routine.findById(req.params.id)

        if (foundRoutine) {


            if (foundRoutine.owner === req.user.id) {

                //deleting excercises 
                const excercisesList = foundRoutine.excercises
                excercisesList.forEach(async function (e) {
                    await Excercise.findByIdAndDelete(e)
                })


                await Routine.findByIdAndDelete(req.params.id)
               

                res.status(204).json('routine Deleted')
            } else {
                res.status(403).json('you are not allowed to delete this routine')
            }

        } else {

            res.status(404).json('routine not found')
        }


    } catch (e) {

        res.status(500).json('error looking for routine or user')
    }

})








module.exports = router;
