import axios from 'axios'
import React, { useState, useContext } from 'react'
import './register.scss'
import { UserContext } from "../../context/UserContext";
import { useHistory } from 'react-router-dom';




export const Register = () => {


    const history = useHistory();

    const { setContextUserInfo } = useContext(UserContext)

    const [usernameForm, setUsernameForm] = useState(null)
    const [emailForm, setEmailForm] = useState(null)
    const [passwordForm, setPasswordForm] = useState("")
    const [passwordForm2, setPasswordForm2] = useState("")

    const [error, setError] = useState({
        state: false, message:
            ""
    })


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordForm2 === passwordForm) {





            try {

                //check if email is already in use
                const emailVerification = await axios.post("https://villalfit.herokuapp.com/api/user/check_email", { email: emailForm })
                console.log(emailVerification.data)

                //null = not in use
                if (emailVerification.data === null) {


                    const res = await axios.post("https://villalfit.herokuapp.com/api/user/new", { username: usernameForm, password: passwordForm, email: emailForm })
                    console.log(res.data)
                    setContextUserInfo(res.data)
                    history.replace('/login')
                    console.log(res)



                }else{
                    setError({ state: true, message: "Email already in use" })

                }



            } catch (err) {
                setError({ state: true, message: "Error creating account" })
                console.log(err)

            }

        } else {
            setPasswordForm("")
            setPasswordForm2("")
            setError({ state: true, message: "Passwords must be the same" })


        }



    }


    return (
        <div className="register">

            <div className="loginContainer">
                <form onSubmit={handleSubmit}>
                    <img src={'./logo400100.jpg'} alt="logo" />

                    <span className="formTitle">SIGN UP</span>


                    <input
                        className="inputForm"
                        minLength="4"
                        maxLength="12"
                        required
                        type="text"
                        placeholder="username"
                        onChange={(e) => setUsernameForm(e.target.value)}
                    />
                    <input
                        className="inputForm"
                        required
                        minLength="4"
                        maxLength="50"
                        type="email"
                        placeholder="email@adress.com"
                        onChange={(e) => setEmailForm(e.target.value)}
                    />
                    <input
                        className="inputForm"
                        required
                        minLength="4"
                        maxLength="12"
                        value={passwordForm}

                        type="password"
                        placeholder="password"
                        onChange={(e) => setPasswordForm(e.target.value)}
                    />
                    <input
                        className="inputForm"
                        required
                        minLength="4"
                        maxLength="12"
                        value={passwordForm2}

                        type="password"
                        placeholder="Repeat password"
                        onChange={(e) => setPasswordForm2(e.target.value)}
                    />

                    <div className="buttonsForm">

                        <button type="submit" className="b1" >
                            Create Account
                        </button>

                        <button type="button" className="b2" onClick={() => { history.push('/login') }}>
                            I have an account
                        </button>

                    </div>

                    <div className="errorText">{error.state && error.message}</div>


                </form>
            </div>

        </div>
    )
}
