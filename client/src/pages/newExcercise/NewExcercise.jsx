import React, {useState} from 'react'
import './newExcercise.scss'
import { TopBar } from '../../components/ui/topBar/TopBar'
import { LeftBar } from '../../components/ui/leftBar/LeftBar'

export const NewExcercise = () => {

    
    
    
    
    const [name, setName] = useState('')
    // eslint-disable-next-line 
    const [picture, setPicture] = useState("https://res.cloudinary.com/ewcomcloud/image/upload/v1635641719/default_yspyxm.png")
    // eslint-disable-next-line 
    const [excercises, setExcercises] = useState([]) //future implementation for adding excercises when creating routine
    
    const [isLoading, setLoading] = useState(false)
    const [isSubmited, setSubmited] = useState('')

    //PETITION TO SUBMIT NEW EXCERCISE
    const handleSubmit = (e) => {

        
        setLoading(true)
        e.preventDefault()

        const body = { name , picture }
        console.log(picture)
        fetch('https://villalfit.herokuapp.com/api/excerciseTemplates/new',
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(() => {
                console.log('Excercise Added')
                setSubmited(true)
                setLoading(false)
            })
    }

    return (
        <div className="newExcercise">
            <TopBar />
            <LeftBar />

            <div className="newExcerciseContainer">

                <form onSubmit={handleSubmit} >
                    {isSubmited && <div className="submited"></div>}
                    
                    <div className="form-container">
                        <input className="formInputText" type="text" name="name" placeholder="Excercise Name" onChange={(e) => { setName(e.target.value) }} />
                       
                        
                        <input className="formSubmit" type="submit" value="Add new excercise " disabled={isLoading} />
                    </div>
                   

                </form>



            </div>

        </div>
    )
}