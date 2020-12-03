/**
 * Invoice Container
 */

import React from "react"
import Alert from "components/Alert"
import DataTable from "containers/Shared/Datatable"
import PaymentIntentItem from "./PaymentIntentItem"
import CustomerService from "services/api/customer"
import {columnsPaymentIntent} from "./constants"

const PaymentIntent = ({id}) => {
    const customerService = new CustomerService()
    const [isLoading, setIsLoading] = React.useState(false)
    const [showError, setShowError] = React.useState()
    const [showInformation, setShowInformation] = React.useState()
    const [result, setResult] = React.useState()
    const [currentPage, setCurrentPage] = React.useState()

    React.useEffect(() => {
		loadData()
    }, [])
    
    const loadData = async (currentPage = 1) => {
        setIsLoading(true)
        setShowError()
        setShowInformation()
		try {
            console.log(currentPage)
			const resp = await customerService.getAllPaymentIntent(id, currentPage)
			if (resp.data && resp.data.data.length > 0) {
				setResult(resp.data)
			} else {
                setShowInformation("Este cliente no tienen pagos efectuados")
            }
		} catch (error) {
            setShowError(
                "No fue posible encontrar los datos del usuarios seleccionado"
            )
		}
		setIsLoading(false)
    }
    
    const onPageChange = (pageNumber) => {
		loadData(pageNumber)
	}

    const showListInvoices = () => {
		if (!result) {
			return []
		} else {
			let rows = new Array()
			result.data.map((item, idx) => {
				const customer = (
					<PaymentIntentItem
						key={idx}
                        id={item.idFlow}
                        subject={item.subject}
                        amountOriginal={item.amountOriginal}
                        currencyOriginal={item.currencyOriginal}
                        createdAt={item.createdAt}
                        amountFinaly={item.amountFinaly}
                        currencyFinaly={item.currencyFinaly}
                        paymentDate={item.paymentDate}
                        status={item.status}
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

                {showInformation ? <div className="col-12">
					<Alert message={showInformation} type="info" />
				</div> : ""}
                
                <DataTable
                    headers={columnsPaymentIntent}
                    rows={showListInvoices()}
                    currentPage={result ? result.currentPage : 0}
                    totalRecords={result ? result.totalRecords : 0}
                    initialRecords={result ? result.initialValue : 0}
                    finishRecords={result ? result.finishValue : 0}
                    onPageChange={onPageChange}
                />
                </>
            )}
        </>
    )
}

export default PaymentIntent

