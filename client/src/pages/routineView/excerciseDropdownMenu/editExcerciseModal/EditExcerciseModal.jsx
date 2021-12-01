import { useEffect, useState } from 'react'
import './editExcerciseModal.scss'
import { axiosInstance } from '../../../../helpers/axiosJWT'
import ReactDom from 'react-dom'


export const EditExcerciseModal = ({ setEditModalOpen, excerciseInfo, fetchExcercisesFromRoutine, setDropDownOpen }) => {


    useEffect(() => {

        //creating fake array of repetitions to show in placeholder when editing
        let placeholderArray = excerciseInfo.repetitions.map((item, i) => ({
            id: i+1,
            repetitions: item,
        }))

        setFields(placeholderArray)
        setFieldsIterator(3)

        // eslint-disable-next-line
    }, [])



    // eslint-disable-next-line
    const [isSubmited, setSubmited] = useState(false)
    // eslint-disable-next-line
    const [isLoading, setLoading] = useState(false)
    const [weight, setWeight] = useState(excerciseInfo.weight)

    //REPETITIONS HOOKs
    const [fieldsIterator, setFieldsIterator] = useState(1)
    const [fields, setFields] = useState([{
        id: 1,
        repetitions: 0,

    }])


    //close modal 
    function closeModal() {

        // no idea why this is the only solution todo search
        setTimeout(() => { setEditModalOpen(false) }, 0);
        setDropDownOpen(false)


    }



    //TODO use atributes of this object to post request new excercise and add id of excercise to routine in id params



    //REPETITITONS ARRAY ONCHANGE FUNCTION
    function handleChangeInput(i, e) {
        const values = [...fields]
        console.log(e.target.name)
        console.log(e.target.value)
        values[i][e.target.name] = e.target.value
        setFields(values)


    }

    //ADD INPUT IN REPETITIONS ARRAY
    function handleAdd() {

        //check maximum
        if (fieldsIterator < 8) {
            setFields([...fields, { id: fieldsIterator + 1, repetitions: '' }])
            setFieldsIterator(fieldsIterator + 1)
            console.log(fields)
        }
    }

    //SUBSTRACT INPUT IN REPETITIONS ARRAY
    function handleSubstract() {

        //check minimum
        if (fieldsIterator > 1) {
            const values = [...fields]
            values.splice(fieldsIterator - 1, 1)
            setFields([...values])

            setFieldsIterator(fieldsIterator - 1)
            console.log(fieldsIterator)

        }



    }



    async function editExcercise(e) {

        e.preventDefault()
        //convert array of objects(fields) in array of numbers to submit request


        let arrayOfRepetitions = fields.map(item => item.repetitions);
        const body = { weight, repetitions: arrayOfRepetitions }
        const axiosJWT = await axiosInstance()
        const localUser = await JSON.parse(localStorage.getItem("user"))
        const auth = {
            headers: { Authorization: 'Bearer ' + localUser.accessToken }
        }
        try {

            const res = await axiosJWT.post(`https://villalfit.herokuapp.com/api/excercise/edit/${excerciseInfo._id}`, body, auth)
            await fetchExcercisesFromRoutine()
            closeModal()

            return res.data
        } catch (e) {
            console.log(e)
        }


    }

//comprobation of form on change

const [isWeightValid, setIsWeightValid] = useState(true)
const [isRepetitionsValid, setIsRepetitionsValid] = useState(true)


useEffect(() => {

    setIsRepetitionsValid(true)

    //flags for comprobattion
   

    if(weight===""){
        setIsWeightValid(false)
    }else{
        setIsWeightValid(true)
    }


    fields.forEach((item) =>{
        if(item.repetitions === ""){
            setIsRepetitionsValid(false)
        } 
    })


    
}, [weight, fields]);



    return ReactDom.createPortal(
        <div className="addExcerciseModal">

            <div onClick={() => { closeModal() }} className="blackBackground"></div>


            <div className="addExcerciseModalContainer">
                <span onClick={() => { closeModal() }} className="xModal">X</span>


                <form>

                    {isSubmited && <div className="submited"></div>}

                    <div className="form-container">


                        <div className="titleContainer">
                            <h1>Edit {excerciseInfo.name}</h1>
                        </div>



                        <div className="weightContainer " >
                            <input className="formInputText" type="number" name="weight"   onChange={(e) => { setWeight(e.target.value) } } value={weight} />
                            <span  >KGs</span>

                        </div>
                        {/* REPETITIONS container */}
                        <div className="repsContainer">
                            <span>Sets</span>
                            {fields.map((field, i) => (

                                <div key={field.id}>
                                    <input className="repetitionsInput" type="number" name="repetitions" value={field.repetitions}
                                        onChange={e => handleChangeInput(i, e)} />

                                </div>

                            ))}
                            <button type="button" onClick={() => { handleAdd(0) }}>+</button>
                            <button type="button" onClick={() => { handleSubstract(0) }}>-</button>


                        </div>


                        <input className="formSubmit" type="submit" value="Crear" disabled={!(isRepetitionsValid && isWeightValid)} onClick={(e) => { editExcercise(e) }} />
                    </div>


                </form>




            </div>
        </div>, document.getElementById('portal')
    )
}
