/**
 * Invoice Container
 */

import React from "react"
import Alert from "components/Alert"
import NotyfContext from "context/notifyContext"
import DataTable from "containers/Shared/Datatable"
import InvoiceItem from "./InvoiceItem"
import InvoiceService from "services/api/invoice"
import {columnsBillingName} from "./constants"

const Billing = ({id}) => {
	const invoiceService = new InvoiceService()
	const notyf = React.useContext(NotyfContext)
	const [isLoading, setIsLoading] = React.useState(false)
	const [isLoadingActions, setIsLoadingActions] = React.useState(false)
	const [showError, setShowError] = React.useState()
	const [showInformation, setShowInformation] = React.useState()
	const [result, setResult] = React.useState()
	const [currentPage, setCurrentPage] = React.useState()

	React.useEffect(() => {
		loadData()
	}, [])

	const loadData = async (currentPage) => {
		setIsLoading(true)
		setShowError()
		setShowInformation()
		try {
			const resp = await invoiceService.getCustomerInvoice(id, currentPage)
			if (resp.data) {
				setResult(resp.data)
			}
		} catch (error) {
			if (
				error.response.data.type === "TheCustomerDontHaveASubscriptionException"
			) {
				setShowInformation("Este cliente no tienen invoices generados")
			} else {
				setShowError(
					"No fue posible encontrar los datos del usuarios seleccionado"
				)
			}
		}
		setIsLoading(false)
	}

	const retryPaymentIntentHandle = async (invoiceId) => {
		setIsLoadingActions(true)
		try {
			const resp = await invoiceService.retryPaymentIntent(id,invoiceId)
			if (resp.data) {
				setResult(resp.data)
			}
			loadData(currentPage)
			notyf.success("Se realizo el pago satisfactoriamente")
		} catch (error) {
			if (
				error.response.data.type ===
				"InvoiceDoesNotPossibleChangerMailIsSendException"
			) {
				notyf.open({
					type: "info",
					message: error.response.data.message
				})
			} else {
                notyf.error("Ah occurrido un error en el proceso")
            }
			
		}
		setIsLoadingActions(false)
	}

	const onChangePage = (pageNumber) => {
		setCurrentPage(pageNumber)
		loadData(pageNumber)
	}

	const showListInvoices = () => {
		if (!result) {
			return []
		} else {
			let rows = new Array()
			result.data.map((item, idx) => {
				const customer = (
					<InvoiceItem
						key={idx}
						id={item.id}
						subject={item.subject}
						amount={item.amount}
						currency={item.currency}
						status={item.status}
						createdAt={item.createdAt}
						nextPaymentIntent={item.nextPaymentIntent}
						dueDate={item.dueDate}
						retryPaymentIntentHandle={retryPaymentIntentHandle}
						isLoadingActions={isLoadingActions}
					/>
				)
				rows.push(customer)
			})
			return rows
		}
	}

	return (
		<>
			{showError ? (
				<div className="col-12">
					<Alert message={showError} type="danger" />
				</div>
			) : (
				<>
					{showInformation ? (
						<div className="col-12">
							<Alert message={showInformation} type="info" />
						</div>
					) : (
						""
					)}

					<DataTable
						headers={columnsBillingName}
						rows={showListInvoices()}
						currentPage={result ? result.currentPage : 0}
						totalRecords={result ? result.totalRecords : 0}
						initialRecords={result ? result.initialValue : 0}
						finishRecords={result ? result.finishValue : 0}
						onPageChange={onChangePage}
					/>
				</>
			)}
		</>
	)
}

export default Billing
