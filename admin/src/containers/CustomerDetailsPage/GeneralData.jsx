/**
 * General Data
 */
import React from "react"
import Alert from "components/Alert"
import NotyfContext from "context/notifyContext"
import PersonalData from "./PersonalData"
import CardRegister from "./CardRegister"
import SubscriptionData from "./SubscripcionData"
import CustomerService from "services/api/customer"

const GeneralData = ({id, isAdmin}) => {
	const customerService = new CustomerService()
	const notyf = React.useContext(NotyfContext)
	const [isLoading, setIsLoading] = React.useState(false)
	const [showError, setShowError] = React.useState()
	const [result, setResult] = React.useState()

	React.useEffect(() => {
		loadData()
	}, [])

	const loadData = async () => {
		setIsLoading(true)
		setShowError()
		try {
			const resp = await customerService.getCustomer(id)
			if (resp.data) {
				setResult(resp.data)
			}
		} catch (error) {
			setShowError(
				"No fue posible encontrar los datos del usuarios seleccionado"
			)
		}
		setIsLoading(false)
	}

	return (
		<>
			{showError ? (
				<div className="col-12">
					<Alert message={showError} type="danger" />
				</div>
			) : (
				<>
					<div className="row">
						<div className="col-12 col-lg-6">
							<PersonalData
								id={id}
								isAdmin={isAdmin}
								personalData={result ? result : null}
							/>
						</div>
						<div className="col-12 col-lg-6">
							<CardRegister
								id={id}
								isAdmin={isAdmin}
								cardData={result ? result.card : null}
								customerId={result ? result.flowCustomerId : null}
								loadData={loadData}
							/>
							<SubscriptionData
								isAdmin={isAdmin}
								hasCreditCard={false}
								subscriptions={result ? result.subscription : null}
								customerId={result ? result.flowCustomerId : null}
								loadData={loadData}
							/>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default GeneralData
