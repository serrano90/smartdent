/**
 * CustomersPage
 */
import React from "react"
import {useNavigate} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import routers from "utils/routers"
import {Auth} from "aws-amplify"
import Breadcrumb from "components/Breadcrumb"
import DataTable from "containers/Shared/Datatable"
import CustomerService from "services/api/customer"
import CustomerListItem from "./CustomerListItem"
import CustomerModal from "./CustomerModal"
import {columnsName, links} from "./constants"

const CustomersPage = () => {
	const customerService = new CustomerService()
	let navigate = useNavigate()
	const [isLoading, setIsLoading] = React.useState(false)
	const [showError, setShowError] = React.useState()
	const [isAdmin, setIsAdmin] = React.useState(false)
	const [result, setResult] = React.useState(null)
	const [filter, setFilter] = React.useState()
	const [page, setPage] = React.useState(1)

	React.useEffect(() => {
		checkAuthentication()
		loadData()
	}, [filter, page])

	const loadData = async () => {
		setIsLoading(true)
		setResult(null)
		try {
			const resp = await customerService.listCustomer(filter, page, true)
			if (resp.data) {
				setResult(resp.data)
			}
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
	}

	const checkAuthentication = async () => {
		const {idToken} = await Auth.currentSession()
		const groups = idToken.payload["cognito:groups"]
		if (groups && groups.length > 0) {
			setIsAdmin(groups.find((element) => element === "Admin") === "Admin")
		}
	}

	const showCustomerList = () => {
		if (!result) {
			return []
		} else {
			let rows = new Array()
			result.data.map((item, idx) => {
				const customer = (
					<CustomerListItem
						key={idx}
						id={item.id}
						fullName={item.fullName}
						emial={item.email}
						createdAt={item.createdAt}
						status={item.status}
						cardRegister={item.haveCardRegister}
						onClickRow={() => selectRow(item.id)}
					/>
				)
				rows.push(customer)
			})
			return rows
		}
	}

	const selectRow = (id) => {
		navigate(routers.ADMIN_CUSTOMERS.route + "/" + id)
	}

	const onChangeFilter = (e) => {
		setFilter(e.target.value)
	}

	const onChangePage = (pageNumber) => {
		setPage(pageNumber)
	}

	return (
		<>
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
				<div className="d-block mb-4 mb-md-0">
					<Breadcrumb links={links} />
					<h2 className="h4">Listado de Clientes</h2>
				</div>
				{isAdmin ? (
					<>
						<div className="btn-toolbar mb-2 mb-md-0">
							<button
								className="btn btn-sm btn-primary"
								data-toggle="modal"
								data-target="#modal-new-client"
							>
								<FontAwesomeIcon icon={["fas", "plus"]} size="sm" /> Nuevo Cliente
							</button>
						</div>
						<CustomerModal />
					</>
				) : (
					""
				)}
			</div>

			<div className="table-settings mb-4">
				<div className="row justify-content-between align-items-center">
					<div className="col col-md-4 col-lg-3 col-xl-2 ml-auto">
						<div className="input-group">
							<span className="input-group-text">
								<span className="fas fa-search"></span>
							</span>{" "}
							<input
								type="text"
								className="form-control"
								name="search"
								onChange={onChangeFilter}
								placeholder="Search"
								aria-label="Search"
								aria-describedby="basic-addon1"
							/>
						</div>
					</div>
				</div>
			</div>
			<DataTable
				headers={columnsName}
				rows={showCustomerList()}
				totalRecords={result ? result.totalRecords : 0}
				currentPage={result ? result.currentPage : 0}
				initialRecords={result ? result.initialValue : 0}
				finishRecords={result ? result.finishValue : 0}
				onPageChange={onChangePage}
			/>
		</>
	)
}

export default CustomersPage
