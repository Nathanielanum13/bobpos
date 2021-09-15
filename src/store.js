export default {
    state() {
        return {
            user: {
                gender: "",
                username: "",
                profile: "user-admin-4.jpg",
            }
        }
    },
    mutations: {
        updateCurrentUserData: (state, userData) => {
            state.user = {...userData, password: "" }
            window.sessionStorage["user"] = JSON.stringify(state.user)
        },
        updateCurrentUserSession: (_, tokenString) => {
            window.sessionStorage["token"] = JSON.stringify(tokenString)
        },
        updateCurrentUserPermissions: (_, roles) => {
            window.sessionStorage["permissions"] = JSON.stringify(roles)
        },
        loadCurrentUser: (state) => {
            state.user = JSON.parse(window.sessionStorage.getItem("user"))
        },
        logCurrentUserOut: (state) => {
            window.sessionStorage.removeItem("user")
            window.sessionStorage.removeItem("permissions")
            window.sessionStorage.removeItem("token")
            state.user = {
                gender: "",
                username: "",
                profile: "user-admin-4.jpg",
            }
        }
    },
    actions: {
        updateUserData: ({ commit }, userData) => {
            commit('updateCurrentUserData', userData)
        },
        updateUserSession: ({ commit }, tokenString) => {
            commit('updateCurrentUserSession', tokenString)
        },
        updateUserPermissions: ({ commit }, roles) => {
            commit('updateCurrentUserPermissions', roles)
        },
        loadUser: ({ commit , state }) => {
            if (state.user.username === "") commit('loadCurrentUser')
        },
        logUserOut: ({commit}) => {
            commit('logCurrentUserOut')
        }
    }
}