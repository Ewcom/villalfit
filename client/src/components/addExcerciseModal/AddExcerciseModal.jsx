
import React, { useState, useEffect } from 'react'
import './addExcerciseModal.scss'
import { axiosInstance } from '../../helpers/axiosJWT'


export const AddExcerciseModal = (props) => {


    const [isSubmited, setSubmited] = useState(false)
    // eslint-disable-next-line
    const [isLoading, setLoading] = useState(false)
    const [weight, setWeight] = useState(0)
    const [showInputTemplate, setShowInputTemplate] = useState(true)




    //REPETITIONS HOOKs
    const [fieldsIterator, setFieldsIterator] = useState(1)
    const [fields, setFields] = useState([{
        id: 1,
        repetitions: 0,

    }])

    //search bar hooks
    const [filteredData, setFilteredData] = useState([])
    const [wordEntered, setWordEntered] = useState("")
    const [templateData, setTemplateData] = useState({})
    const [templateSelected, setTemplateSelected] = useState({})

    //TODO use atributes of this object to post request new excercise and add id of excercise to routine in id params

    const [isWeightValid, setIsWeightValid] = useState(false)
    const [isRepetitionsValid, setIsRepetitionsValid] = useState(false)

    useEffect(() => {

        setIsRepetitionsValid(true)
    
        //flags for comprobattion
       
    
        if(weight==="" || weight===0){
            setIsWeightValid(false)
        }else{
            setIsWeightValid(true)
        }
    
    
        fields.forEach((item) =>{
            if(item.repetitions === "" || item.repetitions === 0){
                setIsRepetitionsValid(false)
            } 
        })
    
    
        
    }, [weight, fields]);
    



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


    function closeModalByOuterClick() {
        props.setAddExcerciseModal(false)
    }


    async function createNewExcercise(e) {

        e.preventDefault()



           //convert array of objects(fields) in array of numbers to submit request
           let arrayOfRepetitions = fields.map(item => item.repetitions);
        
           const name = templateSelected.name
           const picture = templateSelected.picture
           const body = { name, weight, repetitions: arrayOfRepetitions, picture }
           setLoading(true)


        const axiosJWT = await axiosInstance() 
        const localUser = await JSON.parse(localStorage.getItem("user"))
        const auth = {
            headers: { Authorization: 'Bearer ' + localUser.accessToken }
        }

        try {
            const res = await axiosJWT.post(`https://villalfit.herokuapp.com/api/excercise/new`,body, auth)

            fetch(`https://villalfit.herokuapp.com/api/routine/${props.routineId}/${res.data._id}`,
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(() => {

                props.fetchExcercisesFromRoutine()
                setSubmited(true)
                setLoading(false)
                closeModalByOuterClick()
            })

            
            
        } catch (e) {
            console.log(e)
        }


    }


    //SUBMIT BUTTON
    async function handleSubmit(e) {

        //convert array of objects(fields) in array of numbers to submit request
        let arrayOfRepetitions = fields.map(item => item.repetitions);

        const name = templateSelected.name
        const picture = templateSelected.picture
        const body = { name, weight, repetitions: arrayOfRepetitions, picture }
        setLoading(true)
        e.preventDefault()

        //generate excercise and pass _id to the routine
        fetch('https://villalfit.herokuapp.com/api/excercise/new',
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(response => response.json()).then(data => {
                //adding excercise to actual routine
                fetch(`https://villalfit.herokuapp.com/api/routine/${props.routineId}/${data._id}`,
                    {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    }).then(() => {

                        props.fetchExcercisesFromRoutineHook()
                        setSubmited(true)
                        setLoading(false)
                        closeModalByOuterClick()
                    })


            })


    }


    //SEARCH BAR 
    async function getTemplateData() {

        const response = await fetch(
            `https://villalfit.herokuapp.com/api/excerciseTemplates/listoftemplates`,
            {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
            })
        const jsonData = await response.json()
        setTemplateData(jsonData)
        setLoading(false)

    }


    //ON CHANGE SEARCH BAR
    function handleFilter(event) {
        const searchWord = event.target.value
        setWordEntered(searchWord)
        const newFilter = templateData.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase())
        })

        if (searchWord === "") {
            setFilteredData([])

        } else {
            setFilteredData(newFilter)
        }

    }


    function discardTemplateSelectedHandler() {
        setShowInputTemplate(true)
    }

    //ONCLICK ON DROPDOWN MENU OPTION
    async function handleSelectTemplate(e) {

        setLoading(true)
        console.log(e.target.innerText)
        const response = await fetch(
            `https://villalfit.herokuapp.com/api/excerciseTemplates/searchTemplates/${e.target.innerText}`,
            {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
            })
        const jsonData = await response.json()
        setTemplateSelected(jsonData[0])
        setFilteredData([])
        setWordEntered("")
        setShowInputTemplate(false)
        setLoading(false)

    }


    useEffect(() => {
        getTemplateData()
    }, []);

    //todo add verficiation on input with useState false unless all requerimentes are done

    return (
        <div className="addExcerciseModal">

            <div onClick={() => { closeModalByOuterClick() }} className="blackBackground"></div>


            <div className="addExcerciseModalContainer">
                <span onClick={() => { closeModalByOuterClick() }} className="xModal">X</span>


                <form onSubmit={handleSubmit} >

                    {isSubmited && <div className="submited"></div>}

                    <div className="form-container">




                        {/* TEMPLATE SEARCH BAR */}
                        {showInputTemplate && < input
                            className="formInputText"
                            type="text" name="template"
                            placeholder="Excercise Name"
                            value={wordEntered}
                            onChange={handleFilter}
                            autoComplete="off"
                        />}

                        {/* CONTAINER WITH SELECTED TEMPLATE NAME AND PICTURE */}
                        {!showInputTemplate && <div className="templateContainer">
                            <p onClick={discardTemplateSelectedHandler}>x</p>
                            <span>{templateSelected.name}</span>
                            <img src={templateSelected.picture} alt="" />


                        </div>}

                        {filteredData.length !== 0 && (
                            <div className="searchResult">
                                {filteredData.slice(0, 15).map((value, key) => {
                                    return (
                                        <div className="searchItem" key={key} onClick={(e) => { handleSelectTemplate(e) }} >
                                            <p>{value.name} </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}


                        <div className="weightContainer">
                            <input className="formInputText" type="number" name="weight" placeholder="Weight" onChange={(e) => { setWeight(e.target.value) }} />
                            <span>KGs</span>

                        </div>
                        {/* REPETITIONS container */}
                        <div className="repsContainer">
                            <span>Sets</span>
                            {fields.map((field, i) => (

                                <div key={field.id}>
                                    <input className="repetitionsInput" type="number" name="repetitions" placeholder="0"
                                        onChange={e => handleChangeInput(i, e)} />

                                </div>

                            ))}
                            <button type="button" onClick={() => { handleAdd(0) }}>+</button>
                            <button type="button" onClick={() => { handleSubstract(0) }}>-</button>


                        </div>


                        <input className="formSubmit" type="submit" value="Add" disabled={(showInputTemplate) || !isWeightValid || !isRepetitionsValid } onClick={(e) => { createNewExcercise(e) }} />
                    </div>


                </form>




            </div>
        </div>
    )
}
