import axios from "axios"
import jwtDecode from "jwt-decode"
import {refreshTheToken} from './refreshToken'


export async function axiosInstance() {

    const user = await JSON.parse(localStorage.getItem("user"))

    const axiosJWT = await axios.create()

    //check if token expired
    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date()
            const decodedToken = jwtDecode(user.accessToken)
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                console.log('refreshing token...')
                const data = await refreshTheToken()
                config.headers["authorization"] = "Bearer " + data.accessToken
            }
            return config
        }, (error) => {
            return Promise.reject(error)
        })


    return axiosJWT
}



