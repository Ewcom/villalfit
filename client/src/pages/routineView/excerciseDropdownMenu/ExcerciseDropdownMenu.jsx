import { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EditExcerciseModal } from './editExcerciseModal/EditExcerciseModal';
import { axiosInstance } from '../../../helpers/axiosJWT'
import './excerciseDropdownMenu.scss'

export const ExcerciseDropdownMenu = (props) => {

    //props excerciseInfo={excercise} fetchExcercisesFromRoutine={fetchExcercisesFromRoutine

    const [isDropdownOpen, setDropDownOpen] = useState(false)
    const [isEditModalOpen, setEditModalOpen] = useState(false) 


    async function deleteExcerciseHandler(id) {

        const axiosJWT = await axiosInstance()
        const localUser = await JSON.parse(localStorage.getItem("user"))
        const auth = {
            headers: { Authorization: 'Bearer ' + localUser.accessToken }
        }

        try {
            const res = await axiosJWT.delete(`https://villalfit.herokuapp.com/api/excercise/${id}`, auth)
            await props.fetchExcercisesFromRoutine()
            setDropDownOpen(false)

            return res.data
        } catch (e) {
            console.log(e)
        }

    }

function editHandler(){

    setEditModalOpen(true)
}




    return (
        <div className="excerciseDropdownMenu">
            <MoreHorizIcon className="dots" onClick={() => { setDropDownOpen(!isDropdownOpen) }} />

            {/* DROPDOWN MENU */}
            {isDropdownOpen &&
                <div className="dropdownMenuContainer">




                    <div className="dropdownItem" onClick={() => { editHandler()}}>
                        <span>Edit</span>
                        {isEditModalOpen &&  <EditExcerciseModal setDropDownOpen={setDropDownOpen} setEditModalOpen={setEditModalOpen} isEditModalOpen={isEditModalOpen}  excerciseInfo={props.excerciseInfo} fetchExcercisesFromRoutine={props.fetchExcercisesFromRoutine}/>}
                        
                    </div>


                    <div className="dropdownItem" onClick={() => { deleteExcerciseHandler(props.excerciseInfo._id) }}>
                        <span>Delete</span>
                    </div>


                </div>
            }

        </div>
    )
}
