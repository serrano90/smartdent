/**
 *
 */
import React from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {createBrowserHistory} from "history"
import routers from "utils/routers"
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
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	)
}

export default App
