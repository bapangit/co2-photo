var logout = () => {
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('token')
    window.location.href = '/login'
}
export {logout}