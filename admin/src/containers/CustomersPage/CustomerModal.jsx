/**
 * Customer Modal
 */

import React from "react"
import {useFormik} from "formik"
import {useNavigate} from "react-router-dom"
import Alert from "components/Alert"
import SpinnerButton from "components/Button/Spinner"
import {validateCustomer} from "validations/customer"
import CustomerService from "services/api/customer"
import routers from "utils/routers"

const CustomerModal = () => {
	const customerService = new CustomerService()
	const newClientModal = document.getElementById("modal-new-client")
	let navigate = useNavigate()
	const [error, setError] = React.useState(null)
	const newCustomerForm = useFormik({
		initialValues: {
			rut: "",
			name: "",
			lastName: "",
			email: ""
		},
		validationSchema: validateCustomer(),
		onSubmit: handleSubmit
	})

	if (newClientModal) {
		newClientModal.addEventListener("hidden.bs.modal", function (event) {
			setError()
			clearData()
		})
	}

	const clearData = () => {
		newCustomerForm.resetForm({
			rut: "",
			name: "",
			lastName: "",
			email: ""
		})
	}

	async function handleSubmit(values, {setSubmitting}) {
		setError(null)
		let resp = null
		try {
			resp = await customerService.createCustomer(values)
		} catch (err) {
			setError(err.response.data)
		}

		if (resp != null) {
			document
				.getElementById("modal-new-client")
				.getElementsByClassName("btn-close")[0]
				.click()
			navigate(routers.ADMIN_CUSTOMERS.route + "/" + resp.data.id)
		}
		setSubmitting(false)
	}

	return (
		<>
			<div
				className="modal fade"
				id="modal-new-client"
				tabIndex={-1}
				aria-labelledby="modal-new-client"
				style={{display: "none"}}
				aria-hidden="true"
				data-backdrop="static"
				data-keyboard="false"
			>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-body p-0">
							<div className="card p-4">
								<button
									type="button"
									className="btn-close ml-auto"
									data-dismiss="modal"
									aria-label="Close"
								></button>
								<div className="card-header border-0 text-center pb-0">
									<h2 className="mb-0 h5">Crear Cliente</h2>
								</div>
								<div className="card-body">
									{error && error !== null ? (
										<div className="row justify-content-center">
											<div className="col-12 mb-3">
												<Alert type="danger" message={error.message} />
											</div>
										</div>
									) : (
										""
									)}

									<form onSubmit={newCustomerForm.handleSubmit}>
										<div className="form-group mb-4">
											<label>
												RUT
												<span className="small text-dark">
													{"  "}(Ej. 1111111-1)
												</span>
											</label>
											<input
												type="text"
												name="rut"
												className={
													"form-control " +
													(newCustomerForm.errors.rut &&
													newCustomerForm.touched.rut
														? "is-invalid"
														: "")
												}
												placeholder="RUT"
												value={newCustomerForm.values.rut}
												onChange={newCustomerForm.handleChange}
												onBlur={newCustomerForm.handleBlur}
											/>
											{newCustomerForm.touched.rut &&
											newCustomerForm.errors.rut ? (
												<div className="invalid-feedback">
													{newCustomerForm.errors.rut}
												</div>
											) : (
												""
											)}
										</div>
										<div className="form-group mb-4">
											<label>
												Nombre
												<span className="small text-dark">{"  "}(Ej. Pepe)</span>
											</label>
											<input
												type="text"
												name="name"
												className={
													"form-control " +
													(newCustomerForm.errors.name &&
													newCustomerForm.touched.name
														? "is-invalid"
														: "")
												}
												placeholder="Nombre"
												value={newCustomerForm.values.name}
												onChange={newCustomerForm.handleChange}
												onBlur={newCustomerForm.handleBlur}
											/>
											{newCustomerForm.touched.name &&
											newCustomerForm.errors.name ? (
												<div className="invalid-feedback">
													{newCustomerForm.errors.name}
												</div>
											) : (
												""
											)}
										</div>
										<div className="form-group mb-4">
											<label>
												Apellidos
												<span className="small text-dark">
													{"  "}(Ej. Sanchez Perez)
												</span>
											</label>
											<input
												type="text"
												name="lastName"
												className={
													"form-control " +
													(newCustomerForm.errors.lastName &&
													newCustomerForm.touched.lastName
														? "is-invalid"
														: "")
												}
												placeholder="Apellidos"
												value={newCustomerForm.values.lastName}
												onChange={newCustomerForm.handleChange}
												onBlur={newCustomerForm.handleBlur}
											/>
											{newCustomerForm.touched.lastName &&
											newCustomerForm.errors.lastName ? (
												<div className="invalid-feedback">
													{newCustomerForm.errors.lastName}
												</div>
											) : (
												""
											)}
										</div>
										<div className="form-group mb-4">
											<label>
												Email
												<span className="small text-dark">
													{"  "}(Ej. ejemplo@example.cl)
												</span>
											</label>
											<input
												type="text"
												name="email"
												className={
													"form-control " +
													(newCustomerForm.errors.lastName &&
													newCustomerForm.touched.lastName
														? "is-invalid"
														: "")
												}
												placeholder="Email"
												value={newCustomerForm.values.email}
												onChange={newCustomerForm.handleChange}
												onBlur={newCustomerForm.handleBlur}
											/>
											{newCustomerForm.touched.email &&
											newCustomerForm.errors.email ? (
												<div className="invalid-feedback">
													{newCustomerForm.errors.email}
												</div>
											) : (
												""
											)}
										</div>
										<div className="col-12 d-flex justify-content-end">
											<SpinnerButton
												title="Crear"
												type="info"
												isLoading={newCustomerForm.isSubmitting}
												disabled={
													!newCustomerForm.isValid ||
													newCustomerForm.isSubmitting
												}
											/>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CustomerModal
