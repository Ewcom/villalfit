import React, {useEffect, useState} from 'react'
import {axiosInstance} from '../../helpers/axiosJWT'

import './newRoutineModal.scss'

export const NewRoutineModal = (props) => {


    const [name, setName] = useState('')
    // eslint-disable-next-line 
    const [excercises, setExcercises] = useState([]) //future implementation for in page adding excercises
    // eslint-disable-next-line 
    const [isLoading, setLoading] = useState(false)
    // eslint-disable-next-line 
    const [isSubmited, setSubmited] = useState('')
    const [isValid, setIsValid] = useState(false)

    //validating length of reoutine name
    useEffect(() => {
        
        if(name.length>3){
            setIsValid(true)
        } else{
            setIsValid(false)

        }

    }, [name]);

    //close modal 
    function closeModalByOuterClick() {
        props.setNewRoutineModal(false)
    }

         //new routine request
    const createNewRoutine = async ()=> {
        
        const axiosJWT = await axiosInstance() 
        const localUser = await JSON.parse(localStorage.getItem("user"))
        const auth = {
            headers: {Authorization:'Bearer ' + localUser.accessToken} 
        }

        try{
            const res = await axiosJWT.post("https://villalfit.herokuapp.com/api/routine/new", {name:name},
         auth)
            return res.data
        }catch(e){
            console.log(e)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        await createNewRoutine()
        props.fetchRoutinelist() 
        
        setLoading(false)
        closeModalByOuterClick()
    }



    return (
        <div className="newRoutineModal">
            
            <div onClick={() => { closeModalByOuterClick() }} className="blackBackground"></div>

            <div className="newRoutineModalContainer">

            
            <form onSubmit={createNewRoutine} >
                    {isSubmited && <div className="submited"></div>}

                    <div className="formContainer">
                        <input minLength="4" maxLength="20" autoComplete="off" className="formInputText" type="text" name="name" placeholder="Routine name" onChange={(e) => { setName(e.target.value) }} />
                        <input className="formSubmit" type="button" value="Create" onClick={handleSubmit} disabled={!isValid} />
                    </div>


                </form>
            </div>
        </div>
    )
}
