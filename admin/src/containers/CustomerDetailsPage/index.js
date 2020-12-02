/**
 * Customer Details
 */
import React from "react"
import {useParams} from "react-router-dom"
import {Auth} from "aws-amplify"
import Breadcrumb from "components/Breadcrumb"
import {links} from "./constants"
import GeneralData from "./GeneralData"
import Billing from "./Billing"
import ChargeIntentFailed from "./ChargeIntentFailed"
import PaymentIntent from "./PaymentIntent"

const CustomerDetailsPage = () => {
	const {id} = useParams()
	const [isAdmin, setIsAdmin] = React.useState(false)

	React.useEffect(() => {
		checkAuthentication()
	}, [])

	async function checkAuthentication() {
		const {idToken} = await Auth.currentSession()
		const groups = idToken.payload["cognito:groups"]
		if (groups && groups.length > 0) {
			setIsAdmin(groups.find((element) => element === "Admin") === "Admin")
		}
	}

	return (
		<>
			<Breadcrumb links={links} />
			<div className="nav-wrapper position-relative mb-2">
				<ul
					className="nav nav-pills flex-column flex-md-row"
					id="tabs-text"
					role="tablist"
				>
					<li className="nav-item">
						<a
							className="nav-link mb-sm-3 mb-md-0 active"
							id="tabs-general-tab"
							data-toggle="tab"
							href="#tabs-general"
							role="tab"
							aria-controls="tabs-general"
							aria-selected="true"
						>
							Datos General
						</a>
					</li>
					<li className="nav-item">
						<a
							className="nav-link mb-sm-3 mb-md-0"
							id="tabs-billing-tab"
							data-toggle="tab"
							href="#tabs-billing"
							role="tab"
							aria-controls="tabs-billing"
							aria-selected="false"
						>
							Facturas
						</a>
					</li>
					<li className="nav-item">
						<a
							className="nav-link mb-sm-3 mb-md-0"
							id="tabs-payment-fail-tab"
							data-toggle="tab"
							href="#tabs-payment-data"
							role="tab"
							aria-controls="tabs-payment-data"
							aria-selected="false"
						>
							Cargos Realizados
						</a>
					</li>
					<li className="nav-item">
						<a
							className="nav-link mb-sm-3 mb-md-0"
							id="tabs-charge-fail-tab"
							data-toggle="tab"
							href="#tabs-charge-fail"
							role="tab"
							aria-controls="tabs-charge-fail"
							aria-selected="false"
						>
							Cargos Fallidos
						</a>
					</li>
				</ul>
			</div>
			<div className="row my-2">
				<div className="tab-content" id="tabcontent1">
					<div
						className="tab-pane fade show active"
						id="tabs-general"
						role="tabpanel"
						aria-labelledby="tabs-general"
					>
						<GeneralData id={id} isAdmin={isAdmin} />
					</div>
					<div
						className="tab-pane fade"
						id="tabs-billing"
						role="tabpanel"
						aria-labelledby="tabs-billing"
					>
						<Billing id={id} isAdmin={isAdmin} />
					</div>
					<div
						className="tab-pane fade"
						id="tabs-payment-data"
						role="tabpanel"
						aria-labelledby="tabs-payment-data"
					>
						<PaymentIntent id={id} isAdmin={isAdmin}/>
					</div>
					<div
						className="tab-pane fade"
						id="tabs-charge-fail"
						role="tabpanel"
						aria-labelledby="tabs-charge-fail"
					>
						<ChargeIntentFailed id={id} isAdmin={isAdmin} />
					</div>
				</div>
			</div>
		</>
	)
}

export default CustomerDetailsPage
