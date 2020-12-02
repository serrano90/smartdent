/**
 * DashboardPage
 */

import React from "react"
import {Basic} from "components/Widget"
import ReportService from "services/api/report"

const DashboardPage = () => {
	const reportService = new ReportService()
	const [isLoading, setIsLoading] = React.useState(false)
	const [widgetTotal, setWidgetTotal] = React.useState()

	React.useEffect(() => {
		loadData()
	}, [])

	const loadData = async () => {
		setIsLoading(true)
		setWidgetTotal(null)
		try {
			const resp = await reportService.getTotalReport()
			if (resp.data) {
				setWidgetTotal(resp.data)
			}
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
	}

	return (
		<>
			<div className="mt-5">
				<div className="row">
					<div className="col-12 col-md-4 col-sm-6 mb-4 mb-md-0">
						<Basic
							title="Clientes Totales"
							total={
								widgetTotal && widgetTotal.totalCustomers
									? widgetTotal.totalCustomers
									: 0
							}
							isLoading={isLoading}
						/>
					</div>
					<div className="col-12 col-md-4 col-sm-6 mb-4 mb-md-0">
						<Basic
							title="Clientes Pagos al Dia"
							total={
								widgetTotal && widgetTotal.totalCustomersWithSuccessPay
									? widgetTotal.totalCustomersWithSuccessPay
									: 0
							}
							isLoading={isLoading}
						/>
					</div>
					<div className="col-12 col-md-4 col-sm-6 mb-4 mb-md-0">
						<Basic
							title="Clientes Morosos"
							total={
								widgetTotal && widgetTotal.totalCustomerWithMorosePay
									? widgetTotal.totalCustomerWithMorosePay
									: 0
							}
							isLoading={isLoading}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default DashboardPage
