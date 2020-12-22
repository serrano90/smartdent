/**
 * Personal Data
 */

import React from "react"
import {Formik} from "formik"
import Alert from "components/Alert"
import SpinnerButton from "components/Button/Spinner"
import {validateCustomer} from "validations/customer"
import CustomerService from "services/api/customer"

const PersonalData = ({id, isAdmin, personalData}) => {
	const customerService = new CustomerService()
	const [error, setError] = React.useState(null)
	const [isSuccess, setIsSuccess] = React.useState()

	async function handleUpdateSubmit(values, {setSubmitting}) {
		try {
			setError(null)
			setIsSuccess()
			if (values.customerId !== "") {
				await customerService.updateCustomer(id, values)
			}
		} catch (err) {
			setError(err.response.data)
		}
		setSubmitting(false)
	}

	return (
		<>
			<div className="card border-light shadow-sm p-3 pb-4 mb-4">
				<div className="card-header border-light mx-lg-4 p-0 py-3 py-lg-4 mb-4 mb-md-0">
					<h3 className="h5 mb-0">Datos Personales</h3>
				</div>
				<div className="card-body p-0 p-md-4">
					<div className="row justify-content-center">
						{error && error !== null ? (
							<div className="col-12 mb-3">
								<Alert type="danger" message={error.message} />
							</div>
						) : (
							""
						)}
						{isSuccess ? (
							<div className="col-12 mb-3">
								<Alert
									message="Subscripción creada satisfactoria"
									type="success"
								/>
							</div>
						) : (
							""
						)}
						{personalData !== null ? (
							<Formik
								initialValues={{
									rut: personalData.rut,
									name: personalData.name,
									lastName: personalData.lastName,
									email: personalData.email,
									customerId: personalData.flowCustomerId
								}}
								validationSchema={validateCustomer()}
								onSubmit={handleUpdateSubmit}
							>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit,
									isSubmitting,
									isValid
									/* and other goodies */
								}) => (
									<form onSubmit={handleSubmit}>
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
													(errors.rut && touched.rut ? "is-invalid" : "")
												}
												placeholder="RUT"
												disabled={!isAdmin}
												value={values.rut}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											{touched.rut && errors.rut ? (
												<div className="invalid-feedback">{errors.rut}</div>
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
													(errors.name && touched.name ? "is-invalid" : "")
												}
												placeholder="Nombre"
												disabled={!isAdmin}
												value={values.name}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											{touched.name && errors.name ? (
												<div className="invalid-feedback">{errors.name}</div>
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
													(errors.lastName && touched.lastName
														? "is-invalid"
														: "")
												}
												placeholder="Apellidos"
												disabled={!isAdmin}
												value={values.lastName}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											{touched.lastName && errors.lastName ? (
												<div className="invalid-feedback">
													{errors.lastName}
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
													(errors.lastName && touched.lastName
														? "is-invalid"
														: "")
												}
												placeholder="Email"
												disabled={!isAdmin}
												value={values.email}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											{touched.email && errors.email ? (
												<div className="invalid-feedback">{errors.email}</div>
											) : (
												""
											)}
										</div>
										{isAdmin ? (
											<>
												<div className="col-12 d-flex justify-content-end">
													<SpinnerButton
														title="Actualizar"
														type="info"
														isLoading={isSubmitting}
														disabled={!isValid || isSubmitting}
													/>
												</div>
											</>
										) : (
											""
										)}
									</form>
								)}
							</Formik>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default PersonalData
