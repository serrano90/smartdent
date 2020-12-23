/**
 *
 */
import React from "react"
import InformationItem from "./InformationItem"
import NotyfContext from "context/notifyContext"
import {DateFormatString} from "utils/date"
import SpinnerButton from "components/Button/Spinner"
import SubcriptionsService from "services/api/subcriptions"
import SubscriptionDataModal from "./SubscriptionDataModal"

const SubscriptionData = ({
	isAdmin,
	hasCreditCard,
	subscriptions,
	customerId,
	loadData
}) => {
	const notyf = React.useContext(NotyfContext)
	const subcriptionsService = new SubcriptionsService()
	const [isSubmitting, setIsSubmitting] = React.useState(false)
	const [error, setError] = React.useState(null)

	const deleteSubcriptionsHandle = async () => {
		try {
			setIsSubmitting(true)
			await subcriptionsService.deleteSubcriptions(customerId)
			loadData()
		} catch (error) {
			setError(error.response)
		}
		setIsSubmitting(false)
	}

	const createSubscriptionsHandle = async (planId) => {
		try {
			await subcriptionsService.addSubcriptions(customerId, planId)
			loadData()
			notyf.success("Se ha creado una subscripcion correctamente")
		} catch (error) {
			notyf.error("Un error a ocurrido en la creacion")
			setError(error.response)
			return false
		}
		return true
	}

	const updateSubscriptionHandle = async () => {
		try {
			setIsSubmitting(true)
			await subcriptionsService.updateSubscription(customerId)
			loadData()
		} catch (error) {
			setError(error.response)
		}
		setIsSubmitting(false)
	}

	const getStatus = (status) => {
		switch (status) {
			case 0:
				return {
					type: "info",
					text: "Inactiva"
				}
			case 1:
				return {
					type: "success",
					text: "Aceptada"
				}
			default:
				return {
					type: "danger",
					text: "Cancelada"
				}
		}
	}

	const getPaymentStatus = (morose) => {
		if (morose === 1) {
			return {
				type: "danger",
				text: "Atrasado"
			}
		}

		return {
			type: "success",
			text: "Al dia"
		}
	}

	return (
		<>
			<div className="card border-light shadow-sm p-3 pb-4 mb-4">
				<div className="card-header border-light mx-lg-4 p-0 py-3 py-lg-4 mb-4 mb-md-0">
					<h3 className="h5 mb-0">Subscripción</h3>
				</div>
				<div className="card-body p-0 p-md-4">
					<div className="row justify-content-center">
						{isAdmin && hasCreditCard && subscriptions === null ? (
							<button className="btn btn-info">Crear Subcripcion</button>
						) : (
							<>
								<InformationItem
									name="Tipo de Plan:"
									data={{
										type: "text",
										text:
											subscriptions !== null
												? subscriptions.plan
												: "No especificado"
									}}
								/>
								<InformationItem
									name="Estado Actual:"
									data={
										subscriptions !== null
											? {
													type: "badget",
													value: getStatus(subscriptions.status)
											  }
											: {
													type: "text",
													text: "No especificado"
											  }
									}
								/>
								<InformationItem
									name="Estado de Pago:"
									data={
										subscriptions !== null
											? {
													type: "badget",
													value: getPaymentStatus(subscriptions.morose)
											  }
											: {
													type: "text",
													text: "No especificado"
											  }
									}
								/>
								<InformationItem
									name="Proximo Pago:"
									data={{
										type: "text",
										text:
											subscriptions !== null && subscriptions.nextInvoiceDate
												? DateFormatString(subscriptions.nextInvoiceDate)
												: "No especificado"
									}}
								/>
								<InformationItem
									name="Fin de Contrato:"
									data={{
										type: "text",
										text:
											subscriptions !== null && subscriptions.subscriptionEnd
												? DateFormatString(subscriptions.subscriptionEnd)
												: "No especificado"
									}}
								/>
								<div className="col-12 d-flex justify-content-end mt-3">
									<SpinnerButton
										title="Actualizar"
										type="success"
										isLoading={isSubmitting}
										disabled={isSubmitting}
										onClick={updateSubscriptionHandle}
										marginRight={2}
									/>
									{isAdmin ? (
										<div>
											{!subscriptions ? (
												<>
													<button
														className="btn btn-info btn-md mt-2 animate-up-2 mr-0"
														data-toggle="modal"
														data-target="#modal-new-subscription"
													>
														Subcribir
													</button>
													<SubscriptionDataModal
														createSubscriptionsHandle={
															createSubscriptionsHandle
														}
													/>
												</>
											) : subscriptions &&
											  subscriptions.nextInvoiceDate !== null ? (
												<SpinnerButton
													title="Cancelar"
													type="danger"
													isLoading={isSubmitting}
													disabled={isSubmitting}
													onClick={deleteSubcriptionsHandle}
												/>
											) : (
												""
											)}
										</div>
									) : (
										""
									)}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default SubscriptionData
