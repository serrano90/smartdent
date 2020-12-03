/**
 * Thank You Page
 */
import React from "react"
import Logo from "components/Logo"
import {useLocation} from "react-router-dom"
import qs from "query-string"

const useQuery = () => {
    let location = useLocation()
    return React.useMemo(() => qs.parse(location.search), [location.search])
}

const ThankYouPage = () => {
	const {status} = useQuery()

	return (
		<>
			<div className="container-fluid mt-8 mb-4">
				<div className="row">
					<div className="d-flex justify-content-center">
						<Logo />
					</div>
				</div>
				<div className="row">
					<div className="d-flex justify-content-center">
						<div className="col-lg-8 col-md-10 col-xs-12 mb-4 mt-3 text-center">
							<h2 className="mt-5">
								Su registro de tarjeta fue{" "}
								<span className="font-weight-bolder text-primary">
									{ status === "true" ? "realizado satisfactorio" : "rechazado"}
								</span>
							</h2>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ThankYouPage
