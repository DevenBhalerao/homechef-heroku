import axios from 'axios'

export const register = user => {
    return axios
        .post('http://localhost:50/users/register', {
            username: user.username,
            phone: user.phone,
            email: user.email,
            password: user.password,
            name: user.name,
            address: user.address,
            status: user.status,
        })
        .then(res => {
            if(res.data.status==true){
                alert(res.data.data)
                }
                else if(res.data.status==false){
                    alert(res.data.error)
                }  
        })
}

export const login = user => {
    return axios
        .post('http://localhost:5000/users/login', {
            username: user.username,
            password: user.password,
            status: user.status,
        })
        .then(res => {
            if(res.data.status==true){
            console.log('Login!')
            alert("Login Successful")
            localStorage.setItem('usertoken',res.data.accesstoken)
            return res.data.accesstoken
            }
            else if(res.data.status==false){
                alert(res.data.error)
            }
        })
        .catch(err => {
            alert(err)
        })
}

