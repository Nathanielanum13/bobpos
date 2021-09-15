export default function getAuthHeader() {
    const token = JSON.parse(window.sessionStorage.getItem("token"))
    const user = JSON.parse(window.sessionStorage.getItem("user"))
    
    if(token && user) {
        return {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        }
    } else {
        return {}
    }
}