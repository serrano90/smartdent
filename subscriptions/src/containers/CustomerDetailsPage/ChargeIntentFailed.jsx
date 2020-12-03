/**
 * Invoice Container
 */

import React from "react"
import Alert from "components/Alert"
import DataTable from "containers/Shared/Datatable"
import ChargeIntentFailedItem from "./ChargeIntentFailedItem"
import CustomerService from "services/api/customer"
import {columnsChargeIntentFailed} from "./constants"

const PaymentIntentFailed = ({id}) => {
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
        setResult()
		try {
			const resp = await customerService.getAllChargeIntentFailed(id, currentPage)
			if (resp.data && resp.data.data.length > 0) {
				setResult(resp.data)
			} else {
                setShowInformation("Este cliente no tienen ningun intento de pago fallido")
            }
		} catch (error) {
            setShowError(
                "No fue posible encontrar los datos del usuarios seleccionado"
            )
        }
		
		setIsLoading(false)
    }
    
    const onChangePage = (pageNumber) => {
		setCurrentPage(pageNumber)
		loadData()
	}

    const showListInvoices = () => {
		if (!result) {
			return []
		} else {
			let rows = new Array()
			result.data.map((item, idx) => {
                    const customer = (
                        <ChargeIntentFailedItem
                            key={idx}
                            id={item.id}
                            invoiceId={item.invoiceId}
                            createdAt={item.createdAt}
                            amount={item.amount}
                            currency={item.currency}
                            errorCode={item.errorCode}
                            errorDescription={item.errorDescription} />
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
                    headers={columnsChargeIntentFailed}
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

export default PaymentIntentFailed

