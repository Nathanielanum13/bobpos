import { useStore } from "vuex"
import { useRouter } from "vue-router";
import { httpResponse } from "./utils/httpStatusCode"
import axios from "axios"

export default function useAuthentication() {
    const store = useStore()
    const router = useRouter()

    const login = async(formData) => {
        let response;
        try {
            response = await axios.get(`${process.env.VUE_APP_API}/users/${formData.username}`).then(res => {
                if (res.status === httpResponse.SUCCESS && res.data.userData.password === formData.password) {
                    store.dispatch('auth/logUserIn', res.data)
                } else {
                    throw ("Credentials mismatch")
                }
            }).then(_ => router.push("/home"))
        } catch (error) {
            throw error
        }
    }

    const logout = () => {
        window.sessionStorage.removeItem("user")
        new Promise((resolve, reject) => {
            resolve(new Response({ message: "Successful" }, {
                status: 201
            }))
        }).then(_ => {
            store.dispatch('logUserOut').then(_ => {
                router.push("/login")
            })
        })
    }

    return {
        login,
        logout
    }
}