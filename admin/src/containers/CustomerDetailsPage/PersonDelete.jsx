/**
 * Delete Client Component
 */
import React from "react"
import {useNavigate} from "react-router-dom"
import routers from "utils/routers"
import SpinnerButton from "components/Button/Spinner"
import NotyfContext from "context/notifyContext"
import CustomerService from "services/api/customer"

const PersonDelete = ({id}) => {
    let navigate = useNavigate();
    const customerService = new CustomerService()
    const notyf = React.useContext(NotyfContext)
	const [isDelete, setIsDeleteSubmitting] = React.useState()

	async function handleDeleteUser() {
		try {
            setIsDeleteSubmitting(true)
            await customerService.deleteCustomer(id)
            notyf.success("Se elimino satisfactoriamente sera redireccionado")
            navigate(routers.ADMIN_CUSTOMERS.route)
		} catch (err) {
            if(err.response.status === 400 && err.response.data.type === "SubscriptionActiveException") {
                notyf.open({
                    type: 'info',
                    message: err.response.data.message
                })
            } else {
                notyf.error(err.response.data.message)
            }
        }
		setIsDeleteSubmitting(false)
	}

	return (
		<>
			<div className="card border-light shadow-sm p-3 pb-4 mb-4">
				<div className="card-header border-light mx-lg-4 p-0 py-3 py-lg-4 mb-4 mb-md-0">
					<h3 className="h5 mb-0">Eliminar Cliente</h3>
				</div>
				<div className="card-body p-0 p-md-4">
					<p>
						Al realizar esta acción este cliente sera{" "}
						<strong>eliminado defininitivamente</strong>{" "}
					</p>
                    <p>
					* Si el usuario posee una subscripción activa no podra ser eliminado
				    </p>
			    </div>
                <div className="col-12 d-flex justify-content-end">
                <SpinnerButton
                    title="Eliminar"
                    type="danger"
                    isLoading={isDelete}
                    disabled={isDelete}
                    onClick={handleDeleteUser}
                />
                </div>
            </div>
		</>
	)
}

export default PersonDelete
