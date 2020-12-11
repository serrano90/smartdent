/**
 * PaymentMethod
 */

import React from "react"
import useSubcription from "hooks/useSubcription"
import useStepper from "hooks/useStepper"
import Alert from "components/Alert"
import PageButtonWizard from "./PageButtonWizard"
import PaymentService from "services/api/payment"
import CreditCard from "components/CreditCard"
import {ADD_PAYMENT_TOKEN, ADD_CARD} from "consts/subcriptions"
import {NEXT_STEP, PREVIOUS_STEP} from "consts/steppers"

export default function () {
	const [error, setError] = React.useState()
	const paymentService = new PaymentService()
	const [stateSubcription, dispatchSubcription] = useSubcription()
	const [stateStep, dispatchStepper] = useStepper()

	React.useEffect(() => {
		loadCard()
	}, [])

	const handleAddCard = async () => {
		try {
			setError(null)
			const resp = await paymentService.addCard(stateSubcription.customerId)
			dispatchSubcription({
				type: ADD_PAYMENT_TOKEN,
				token: resp.data.token
			})
			window.location.href = `${resp.data.url}?token=${resp.data.token}`
		} catch (error) {
			setError(error.response.data)
		}
	}

	const loadCard = async () => {
		if (stateSubcription.token !== "") {
			try {
				setError(null)
				const resp = await paymentService.getStatus(stateSubcription.token)
				dispatchSubcription({
					type: ADD_CARD,
					card: resp.data
				})
				dispatchStepper({type: NEXT_STEP})
			} catch (error) {
				console.log(error.response.data)
				setError({
					message: "La tarjeta ha sido rechazada"
				})
				dispatchSubcription({
					type: ADD_PAYMENT_TOKEN,
					token: ""
				})
			}
		}
	}

	return (
		<>
			{error && error !== null ? (
				<div className="row justify-content-center">
					<div className="col-12 mb-3">
						<Alert type="danger" message={error.message} />
					</div>
				</div>
			) : (
				""
			)}
			<div className="row justify-content-center mb-6 mt-6">
				{!stateSubcription.card.status ? (
					<div className="col-4">
						<button
							disabled={
								stateSubcription.customerId &&
								stateSubcription.customerId === ""
							}
							className="btn btn-info btn-lg"
							onClick={() => handleAddCard()}
						>
							Adicionar Tarjeta
						</button>
					</div>
				) : (
					<CreditCard {...stateSubcription.card} />
				)}
			</div>
			<hr className="mt-4" />
			<div className="d-flex justify-content-around">
				<div className="col-4">
					<PageButtonWizard
						title="Anterior"
						handleStep={() => dispatchStepper({type: PREVIOUS_STEP})}
					/>
				</div>
				<div className="col-4">
					{stateSubcription.card.status ? (
						<PageButtonWizard
							title="Siguiente"
							handleStep={() => dispatchStepper({type: NEXT_STEP})}
						/>
					) : (
						""
					)}
				</div>
			</div>
		</>
	)
}
