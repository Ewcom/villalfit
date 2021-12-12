import React from 'react'
import './leftBar.scss'
import { Link } from "react-router-dom"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


export const LeftBar = () => {

    // const history = useHistory()


    return (
        <div className="leftBar">
            <Link to="/">

                <div className="logo">VILLALFIT</div>
            </Link>
            <hr />

            <div className="mobile-routines">
                <Link to="/">
                    <FormatListBulletedIcon className='mobile-icon' />
                </Link>
            </div>

            <div className="buttons-container">

                <Link to="/">
                    <div className="section">My Routines</div>
                </Link>


                <Link to="/new_excercise">
                    <div className="section">Add Excercise </div>
                </Link>

                {/* <Link to="/new_routine">
                    <div className="section">New Routine</div>
                </Link> */}

                {/* <Link to="/routine_view">
                    <div className="section">Statistics</div>
                </Link> */}
            </div>

        </div>
    )
}
