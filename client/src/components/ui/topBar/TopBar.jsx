import React from 'react'
import { ProfileUI } from '../profileUI/ProfileUI'
import './topBar.scss'
export const TopBar = () => {
    return (
        <div className="topBar">

            <div className="profileInfo">
                <ProfileUI/>
            </div>

        </div>
    )
}
