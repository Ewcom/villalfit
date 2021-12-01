import React from 'react'
import './routinesBar.scss'

//UI Barra para crear/modificar/agregar ejercicios a tu rutina 
export const RoutinesBar = (props) => {

    //onclick function to open the add excercise to routine modal
function addExcerciseHandler (){
    props.setNewRoutineModal(!props.isNewRoutineModalOpen)
}

    return (
        <div className="routinesBar">
            <div className="newRoutineContainer">
<button onClick={()=>{addExcerciseHandler()}}>New Routine</button>
            </div>
            
        </div>
    )
}
