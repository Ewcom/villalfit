import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ExcerciseCard } from '../../components/excerciseCard/ExcerciseCard'
import { LeftBar } from '../../components/ui/leftBar/LeftBar'
import { TopBar } from '../../components/ui/topBar/TopBar'
import { AddExcerciseModal } from '../../components/addExcerciseModal/AddExcerciseModal.jsx'
import './routineView.scss'
import { RoutineViewBar } from './routineViewBar/RoutineViewBar'
import { ExcerciseDropdownMenu } from './excerciseDropdownMenu/ExcerciseDropdownMenu'




export const RoutineView = () => {


    const { id } = useParams()
    const [fetchedExcercises, setFetchedExcercises] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isAddExcerciseModalOpen, setAddExcerciseModal] = useState()
    const [error, setError] = useState(false)


    async function fetchExcercisesFromRoutine() {

        try {



            const response = await fetch(
                `https://villalfit.herokuapp.com/api/routine/excercisesinfo/${id}`,
                {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" },
                })
            const jsonData = await response.json()
            setFetchedExcercises(jsonData)
            setLoading(false)
        } catch (e) {
            setError(true)
        }


    }

    //LOADING TEST ROUTINE WHEN INIT
    useEffect(() => {
        fetchExcercisesFromRoutine()
        // eslint-disable-next-line
    }, []);

    if (error) {
        return (
            <h1>ERROR HAS OCURRED</h1>
        )
    }



    return (
        <div className="routineView">
            <TopBar />
            <RoutineViewBar setAddExcerciseModal={setAddExcerciseModal} isAddExcerciseModalOpen={isAddExcerciseModalOpen} />
            <LeftBar />

            {/* rutineViewBar Ui > routine view > modal    PROPS */}

            {/* MODAL  */}
            <div className="modal-wrapper">
                {isAddExcerciseModalOpen ? <AddExcerciseModal fetchExcercisesFromRoutine={fetchExcercisesFromRoutine} setAddExcerciseModal={setAddExcerciseModal} routineId={id} /> : null}

            </div>


            <div className="routineViewContainer">
                {isLoading ? 'loading' :
                
                (fetchedExcercises.length===0) ? <div className="noExcercisesContainer">
                <h1>You dont have excercises yet. Try adding one first</h1>
            </div> : 
                

                fetchedExcercises.map(excercise => {
                    // protecction against corrupted data
                    if (excercise === undefined || excercise === null) { return <div>NA</div> } else {
                        return(
                        <div className="excercise-container" key={excercise._id}>
                            <ExcerciseDropdownMenu className="excerciseDropdownMenu" excerciseInfo={excercise} fetchExcercisesFromRoutine={fetchExcercisesFromRoutine} />

                            <ExcerciseCard excerciseInfo={excercise} />

                        </div>
                        )
                    }
                })}




            </div>



        </div>
    )
}
