import React, { useState, useEffect, useHistory } from 'react'
import './profileUI.scss'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { axiosInstance } from '../../../helpers/axiosJWT'
// import { useHistory } from 'react-router-dom';



export const ProfileUI = () => {

    const [profileName, setProfileName] = useState('')

    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false)
    // const history = useHistory();


    async function fetchProfileDataFromLocalStorage() {

        try {
            const localUser = await JSON.parse(localStorage.getItem("user"))
            setProfileName(localUser.username)


        } catch (e) {
            console.log('error trying loading PROFILEUI info')
        }
    }

    useEffect(() => {

        fetchProfileDataFromLocalStorage()
        // eslint-disable-next-line
    }, []);


    // LOGOUT
    const handleLogout = async () => {

        const localUser = await JSON.parse(localStorage.getItem("user"))
        const axiosJWT = await axiosInstance()

        try {
            const res = await axiosJWT.post("https://villalfit.herokuapp.com/api/auth/logout",
                { token: localUser.refreshToken },
                { headers: { authorization: "Bearer " + localUser.accessToken } })

            console.log(res.data)
            await localStorage.removeItem("user")
            // history.go('/')
            window.location.reload();

            




        } catch (err) {
            console.log(err)
        }
    }




    return (




        <div className="profileUI">
            <span>{profileName}</span>
            <ArrowDropDownIcon className="iconDropdown" onClick={() => { setProfileDropdownOpen(!isProfileDropdownOpen) }} />
            {/* DROPDOWN MENU */}
            {isProfileDropdownOpen &&
                <div className="dropdownMenuContainer">
                    <div className="dropdownlogout" onClick={handleLogout}>
                        <span>Logout</span>

                    </div>
                </div>
            }

        </div>
    )
}
