import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RoutineCard } from '../../components/routineCard/RoutineCard'
import { LeftBar } from '../../components/ui/leftBar/LeftBar'
import { TopBar } from '../../components/ui/topBar/TopBar'
import './routines.scss'
import { axiosInstance } from '../../helpers/axiosJWT'
import { RoutinesBar } from './routinesBar/RoutinesBar'
import { NewRoutineModal } from '../../components/newRoutineModal/NewRoutineModal'
import { RoutineDropdownMenu } from './routineDropdownMenu/RoutineDropdownMenu'
import ErrorBoundary from '../../errorBoundaries/errorBoundary'


export const Routines = () => {


    const [routineList, setRoutineList] = useState()
    const [isLoading, setLoading] = useState(true)
    const [isNewRoutineModalOpen, setNewRoutineModal] = useState(false)



    //get all routines from this user
    async function fetchRoutinelist() {
        const localUser = await JSON.parse(localStorage.getItem("user"))

        const axiosJWT = await axiosInstance()
        const res = await axiosJWT.get('https://villalfit.herokuapp.com/api/routine/my_routines', { headers: { authorization: "Bearer " + localUser.accessToken } })
        setRoutineList(res.data)
        setLoading(false)
    }


    //LOADING TEST ROUTINE WHEN INIT
    useEffect(() => {
        fetchRoutinelist()
        // eslint-disable-next-line
    }, []);



    return (
        <div className="routines">
            <TopBar />
            <RoutinesBar setNewRoutineModal={setNewRoutineModal} isNewRoutineModalOpen={isNewRoutineModalOpen} />
            <LeftBar />



            <div className="modal-wrapper">
                {isNewRoutineModalOpen && <NewRoutineModal setNewRoutineModal={setNewRoutineModal} isNewRoutineModalOpen={isNewRoutineModalOpen} fetchRoutinelist={fetchRoutinelist} />}

            </div>


            <div className="routines-container">

           
                
                
                

               { isLoading  ? <div>Loading Routine</div> :

               
                (routineList.length===0) ? <div className="noRoutinesContainer">
                    <h1>You dont have routines yet!. Try adding one first</h1>
                </div> : 
                 
                
                    routineList.map(routine => (
                      
                      

                        <div key={routine._id}>
                            
                           
                                <RoutineDropdownMenu className="routineDropdownMenu" routineInfo={routine} fetchRoutineList={fetchRoutinelist} />

                                <Link key={routine._id} to={`/routine_view/${routine._id}`}>
                                    <ErrorBoundary>
                                    <RoutineCard routineInfo={routine} />
                                    </ErrorBoundary>
                                </Link>
                          
                        </div>
                    ))
                    
                }
                  
            </div>
        </div>
    )
}
