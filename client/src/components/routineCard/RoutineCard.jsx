import React, { useEffect, useState } from 'react'
import './routineCard.scss'


export const RoutineCard = (props) => {
    //props.routineInfo 

    const [isLoading, setLoading] = useState(true)
    const [fetchedExcercises, setFetchedExcercises] = useState([])
   

    //1 RECIBIR ARRAY DE IDS EN PROPS DE LA ROUTINECARD
    //2 FETCHAT IDS CON POST  REQUEST   
    //3 MAP FETCHEDEXCERCISES




    useEffect(() => {

        const fetchRoutine = async (listOfExcercises) => {

            const body = { "ids": listOfExcercises }
            //fetching routine con el array de ejercicios
            const response = await fetch(
                'https://villalfit.herokuapp.com/api/excercise/listofexcercises',
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })

            const jsonData = await response.json()
            setLoading(false)
            setFetchedExcercises(jsonData)

        }

        fetchRoutine(props.routineInfo.excercises)
        
    // eslint-disable-next-line
    }, []);






    return (
        <div className="routineCard">
            <div className="name" >{props.routineInfo.name}</div>
           
            

            <hr/>

            <div className="routine-pictures">
                {isLoading ? <div>cargando</div> :
                    fetchedExcercises.map(excercise => {
                    // protecction agains corrupted data
                      
                        if(excercise===undefined || excercise===null ) {return <div>NA</div>} else{
                            return(  <img src={excercise.picture} alt={excercise.picture} key={excercise._id}  />)
                        }

                  
                    })
                }
            </div>

        </div>
    )
}
