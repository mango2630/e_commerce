export const setToken = (token) => {
    // 存储token
    localStorage.setItem("TOKEN", token)

}

export const getToken = ()=>{
    return localStorage.getItem("TOKEN")
}
export const removeToke = ()=> {
    localStorage.removeItem("TOKEN")
}