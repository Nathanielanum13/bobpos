export default {
    namespaced: true,
    state() {
        return {
            user: {
                gender: "",
                username: "",
                profile: "user-admin-4.jpg",
            },
            isAuthorizedToWrite: false
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
            state.isAuthorizedToWrite = false
        },
        updateAuthorization: (state) => {
            state.isAuthorizedToWrite = true
        }
    },
    actions: {
        logUserIn: ({commit}, data) => {
            commit('updateCurrentUserData', data.userData)
            commit('updateCurrentUserSession', data.token)
            commit('updateCurrentUserPermissions', data.roles)
        },
        loadUser: ({ commit , state }) => {
            if (state.user.username === "") commit('loadCurrentUser')
        },
        logUserOut: ({commit}) => {
            commit('logCurrentUserOut')
        },
        checkPermission: ({commit}) => {
            const permissions = JSON.parse(window.sessionStorage.getItem("permissions")) ?? []
            if (permissions.includes("read") && permissions.includes("write")) {
                commit('updateAuthorization')
            }
        }
    }
}