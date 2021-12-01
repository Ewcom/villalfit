import axios from 'axios'
import React, { useState, useContext } from 'react'
import './login.scss'
import { UserContext } from "../../context/UserContext";
import { useHistory } from 'react-router-dom';




export const Login = () => {


    const history = useHistory();

    const { setContextUserInfo } = useContext(UserContext)
    const [isLoading, setLoading] = useState(false)
    const [emailForm, setEmailForm] = useState(null)
    const [passwordForm, setPasswordForm] = useState("")
    const [error, setError] = useState({
        state: false, message:
            "message"
    })



    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post("https://villalfit.herokuapp.com/api/auth/login", { email: emailForm, password: passwordForm })

            

            setContextUserInfo(res.data)
            console.log('loged user', res.data)
            localStorage.setItem("user", await JSON.stringify(res.data))
            history.go('/routines')
            setLoading(false)



        } catch (err) {
            //case wrong credentials
            setError({ state: true, message: "Wrong username or password" })
            setPasswordForm("")
            setLoading(false)
        }

    }

    //LOGOUT
    // const handleLogout = async () => {

    //     const localUser = await JSON.parse(localStorage.getItem("user"))
    //     const axiosJWT = await axiosInstance()

    //     try {
    //         const res = await axiosJWT.post("http://localhost:8080/api/auth/logout",
    //             { token: localUser.refreshToken },
    //             { headers: { authorization: "Bearer " + localUser.accessToken } })

    //         console.log(res.data)
    //         setContextUserInfo(res.data)

    //         localStorage.removeItem("user")


    //     } catch (err) {
    //         console.log(err)
    //     }
    // }


    return (
        <div className="login">

            <div className="loginContainer">
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <img src={'./logo400100.jpg'} alt="logo" />
                    <span className="formTitle">LOGIN</span>


                    <input
                        className="inputForm"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmailForm(e.target.value)}
                    />
                    <input
                        className="inputForm"
                        type="password"
                        placeholder="Password"
                        value={passwordForm}
                        onChange={(e) => setPasswordForm(e.target.value)}
                    />

                    <span className="recoverLink">can't access to my account</span>


                    <div className="buttonsForm"  >
                        <button type="submit" className="b1" disabled={isLoading} >
                            {!isLoading ? 'Log In' : 'Loading'}
                        </button>

                        <button type="button" className="b2" onClick={() => { history.push('/register') }}>
                            Create account
                        </button>

                    </div>

                    <div className="errorText">{error.state && error.message}</div>

                </form>
            </div>

        </div>
    )
}
