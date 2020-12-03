/**
 *
 */
import React from "react"
import {BrowserRouter as Router, Routes, Route, Outlet} from "react-router-dom"
import {createBrowserHistory} from "history"
import PrivateRouter from "./PrivateRouter"
import routers from "utils/routers"
import DashboardPage from "containers/DashboardPage"
import CustomerPage from "containers/CustomersPage"
import LoginPage from "containers/LoginPage"
import ChangePasswordPage from "containers/ChangePassword"
import CustomerDetailsPage from "containers/CustomerDetailsPage"
import SubcriptionPage from "containers/SubcriptionPage"
import ThankYouPage from "containers/ThankYouPage"
import NotFoundPage from "containers/NotFoundPage"

const history = createBrowserHistory()

const App = () => {
	return (
		<Router history={history}>
			<Routes>
				<Route
					exact
					path={routers.SUBCRIPTIONS.path}
					element={<SubcriptionPage />}
				/>
				<Route
					exact
					path={routers.THANKYOU.path}
					element={<ThankYouPage />}
				/>
				<Route path="" element={<NotFoundPage />} />
			</Routes>
		</Router>
	)
}

const RouteBase = () => {
	return (
		<>
			<Outlet />
		</>
	)
}

export default App
