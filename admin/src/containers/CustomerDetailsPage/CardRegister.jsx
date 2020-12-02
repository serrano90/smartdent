/**
 * Card Register
 */

import React from "react"
import Alert from "components/Alert"
import NotyfContext from "context/notifyContext"
import SpinnerButton from "components/Button/Spinner"
import PaymentService from "services/api/payment"
import InformationItem from "./InformationItem"

const CardRegister = ({id, isAdmin, cardData, customerId, loadData}) => {
	const paymentService = new PaymentService()
	const notyf = React.useContext(NotyfContext)
	const [error, setError] = React.useState(null)
	const [isSubmitting, setIsSubmitting] = React.useState(false)
	const [btnClick, setBtnClick] = React.useState("")

	const deleteCardHandle = async () => {
		setIsSubmitting(true)
		setBtnClick("delete")
		try {
			await paymentService.unRegisterCard(id)
			loadData()
		} catch (error) {
			console.log(error)
			if (error.response.status) {
				setError("Un error ha ocurrido")
			} else {
				setError("No fue posible encontrar los datos del usuarios seleccionado")
			}
		}
		setIsSubmitting(false)
		setBtnClick("")
	}

	const addCreditCardHandle = async () => {
		try {
			setError(null)
			const resp = await paymentService.addCard(customerId, true)
			window.location.href = `${resp.data.url}?token=${resp.data.token}`
		} catch (error) {
			setError(error.response.data.message)
		}
	}

	const sendToRegisterCardHandle = async () => {
		setIsSubmitting(true)
		setBtnClick("updateCard")
		try {
			setError(null)
			await paymentService.sendEmailToRegisterCard(id)
			notyf.success("El correo electronico a sido enviado satisfactoriamente")
		} catch (error) {
			if (error.response.status) {
				setError("Un error ha ocurrido")
			} else {
				setError("No fue posible encontrar los datos del usuarios seleccionado")
			}
		}
		setIsSubmitting(false)
		setBtnClick("")
	}

	const getStatusCard = (status) => {
		if (!status) {
			return {
				type: "danger",
				text: "Rechazada"
			}
		}
		return {
			type: "success",
			text: "Aceptada"
		}
	}

	return (
		<>
			<div className="card border-light shadow-sm p-3 pb-4 mb-4">
				<div className="card-header border-light mx-lg-4 p-0 py-3 py-lg-4 mb-4 mb-md-0">
					<h3 className="h5 mb-0">Tarjeta de Credito</h3>
				</div>
				<div className="card-body p-0 p-md-4">
					<div className="row justify-content-center">
						{error && error !== null ? (
							<div className="col-12 mb-3">
								<Alert type="danger" message={error} />
							</div>
						) : (
							""
						)}
						{cardData !== null ? (
							<>
								<InformationItem
									name="Tipo de Tarjeta:"
									data={{
										type: "text",
										text:
											cardData !== null
												? cardData.creditCardType && cardData.creditCardType === "" ? cardData.creditCardType : "No registrada"
												: "No especificado"
									}}
								/>
								<InformationItem
									name="Tarjeta Terminada:"
									data={{
										type: "text",
										text:
											cardData !== null
												? cardData.last4CardDigits && cardData.last4CardDigits === "" ? cardData.last4CardDigits : "No registrada"
												: "No especificado"
									}}
								/>
								<InformationItem
									name="Estado de Pago:"
									data={
										cardData !== null
											? {
													type: "badget",
													value: getStatusCard(cardData.status)
											  }
											: {
													type: "text",
													text: "No especificado"
											  }
									}
								/>
							</>
						) : (
							""
						)}
						<div className="col-12 d-flex justify-content-end mt-2">
							<SpinnerButton
								title="Enviar enlace"
								type="success"
								isLoading={btnClick === "updateCard"}
								disabled={isSubmitting}
								onClick={sendToRegisterCardHandle}
								marginRight={2}
							/>
							{isAdmin && cardData === null ? (
								<button
									className="btn btn-info btn-md mt-2 animate-up-2"
									onClick={() => addCreditCardHandle()}
								>
									Registrar Tarjeta
								</button>
							) : isAdmin ? (
									<SpinnerButton
										title="Eliminar"
										type="danger"
										isLoading={btnClick === "delete"}
										disabled={isSubmitting}
										onClick={deleteCardHandle}
									/>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CardRegister
