/**
 * PrivateRouter Container
 */

import React from "react"
import {Route, useNavigate} from "react-router-dom"
import routers from "utils/routers"
import Layout from "components/Layout"
import {Auth, Hub} from "aws-amplify"

const PrivateRouter = ({history, ...rest}) => {
	let navigate = useNavigate();
	const [user, setUser] = React.useState()

	React.useEffect(() => {
		checkAuth()

		Hub.listen("auth", checkAuthListener)

		return () => Hub.remove("auth", checkAuthListener)
	}, [])

	const checkAuthListener = ({payload}) => {
		if (payload.event === "signOut") {
			checkAuth()
		}
	}

	const checkAuth = async () => {
		const auth = await isAuthenticated()
		if (!auth) {
			navigate(routers.ADMIN_LOGIN.route)
		}
	}

	const isAuthenticated = async () => {
		try {
			let user = await Auth.currentAuthenticatedUser()
			setUser(user)
			let session = await Auth.currentSession()
			return session.isValid
		} catch (err) {
			return false
		}
	}

	const handleSignOut = async () => {
		try {
			await Auth.signOut()
			
		} catch (error) {
			console.log("error signing out: ", error)
		}
	}

	return (
		<Layout handleSignOut={handleSignOut} user={user}>
			<Route {...rest}/>
		</Layout>
	)
}

export default PrivateRouter
