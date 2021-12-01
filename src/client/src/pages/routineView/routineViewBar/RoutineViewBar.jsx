import React from 'react'
import './routineViewBar.scss'

//UI Barra para crear/modificar/agregar ejercicios a tu rutina 
export const RoutineViewBar = (props) => {

    //onclick function to open the add excercise to routine modal
function addExcerciseHandler (){
    props.setAddExcerciseModal(!props.isAddExcerciseModalOpen)
}

    return (
        <div className="routineViewBar">
            <div className="addExcerciseContainer">
<button onClick={()=>{addExcerciseHandler()}}>Add Excercise</button>
            </div>
            
        </div>
    )
}
