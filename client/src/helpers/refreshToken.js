import axios from "axios"

export const  refreshTheToken = async () =>{

    const user = await JSON.parse(localStorage.getItem("user"))
    try{
        const res = await axios.post("https://villalfit.herokuapp.com/api/auth/refresh", {id: user.id, token: user.refreshToken})
        const  newUser = {
            ...user,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken
        }

    await localStorage.setItem("user", JSON.stringify(newUser))
        window.location.reload();
        return res.data

    }catch(err){
        console.log(err)
    }
}


