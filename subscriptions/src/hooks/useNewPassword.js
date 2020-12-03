/**
 * NewPasswordContext
 */
import React from "react"
import globalHook from "use-global-hook"

const initialState = {
    username: "",
    password: "",
}

const setUser = (store, user) => {
	store.setState(user)
}

const useNewPassword = globalHook(React, initialState, {setUser})

export default useNewPassword
