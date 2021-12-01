import React, { useState } from 'react'
import { LeftBar } from '../../components/ui/leftBar/LeftBar'
import { TopBar } from '../../components/ui/topBar/TopBar'
import './newRoutine.scss'
import {axiosInstance} from '../../helpers/axiosJWT'


export const NewRoutine = () => {


    //TODO 22/10
    const [name, setName] = useState('')
    // eslint-disable-next-line 
    const [excercises, setExcercises] = useState([]) //future implementation for in page adding excercises
    const [isLoading, setLoading] = useState(false)
    // eslint-disable-next-line 
    const [isSubmited, setSubmited] = useState('')



        
    const createNewRoutine = async ()=> {
        

        const axiosJWT = await axiosInstance() 



        const localUser = await JSON.parse(localStorage.getItem("user"))
        console.log(localUser.accessToken)
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



    //PETITION TO SUBMIT NEW REOUTINE


    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        createNewRoutine()




    }


    return (
        <div className="newRoutine">
            <TopBar />
            <LeftBar />

            <div className="newRoutineContainer">

                <form onSubmit={createNewRoutine} >
                    {isSubmited && <div className="submited"></div>}

                    <div className="form-container">
                        <input className="formInputText" type="text" name="name" placeholder="Routine Name" onChange={(e) => { setName(e.target.value) }} />
                        <input className="formSubmit" type="button" value="Crear" onClick={handleSubmit} disabled={isLoading} />
                    </div>


                </form>



            </div>

        </div>
    )
}
