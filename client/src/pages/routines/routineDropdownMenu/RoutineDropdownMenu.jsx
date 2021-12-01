import { useState } from 'react'
import './routineDropdownMenu.scss'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { axiosInstance } from '../../../helpers/axiosJWT'




export const RoutineDropdownMenu = (props) => {

    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false)
    const [isRenameModelOpen, setRenameModelOpen] = useState(false)
    const [rename, setRename] = useState("")


    async function deleteRoutineHandler(id) {

        const axiosJWT = await axiosInstance()
        const localUser = await JSON.parse(localStorage.getItem("user"))
        const auth = {
            headers: { Authorization: 'Bearer ' + localUser.accessToken }
        }

        try {
            const res = await axiosJWT.delete(`https://villalfit.herokuapp.com/api/routine/${id}`, auth)
            await props.fetchRoutineList()
            return res.data


        } catch (e) {
            console.log(e)
        }

    }

    async function handleRename(id){
        console.log('rname actioned')

        const axiosJWT = await axiosInstance()
        const localUser = await JSON.parse(localStorage.getItem("user"))
        const auth = {
            headers: { Authorization: 'Bearer ' + localUser.accessToken }
        }

        try {
            const res = await axiosJWT.post(`https://villalfit.herokuapp.com/api/routine/rename/${id}`,{newName:rename}, auth)
            await props.fetchRoutineList()
            setProfileDropdownOpen(false)
            setRenameModelOpen(false)
            return res.data


        } catch (e) {
            console.log(e)
        }


    }




    return (
        <div className="routineDropdownMenu">


            <MoreHorizIcon className="dots" onClick={() => { setProfileDropdownOpen(!isProfileDropdownOpen) }} />
            {/* DROPDOWN MENU */}
            {isProfileDropdownOpen &&
                <div className="dropdownMenuContainer">


                    <div className="dropdownItem" onClick={() => {setRenameModelOpen(!isRenameModelOpen)  }}>
                        <span>Rename</span>
                    </div>

                    <div className="dropdownItem" onClick={() => { deleteRoutineHandler(props.routineInfo._id) }}>
                        <span>Delete</span>
                    </div>
        
                </div>
            }

            <div className="renameModal">
            {isRenameModelOpen &&<div>
                
                <div className="formContainer">
                        <input minLength="4" maxLength="20" autoComplete="off" className="formInputText" type="text" name="name" placeholder="Routine Name" onChange={(e) => { setRename(e.target.value) }} />
                        <input className="formSubmit" type="button" value="rename" onClick={()=>{handleRename(props.routineInfo._id)}}  />
                    </div>



                </div>}

            </div>

        </div>
    )
}
