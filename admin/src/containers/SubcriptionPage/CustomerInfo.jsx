/**
 * Customer Information
 */
import React from "react"
import {Formik} from "formik"
import useSubcription from "hooks/useSubcription"
import useStepper from "hooks/useStepper"
import Alert from "components/Alert"
import CustomerService from "services/api/customer"
import PageButtonWizard from "./PageButtonWizard"
import {ADD_CUSTOMER} from "consts/subcriptions"
import {NEXT_STEP, PREVIOUS_STEP} from "consts/steppers"
import {validateCustomer} from "./validate"

export default function () {
	const customerService = new CustomerService()
	const [error, setError] = React.useState(null)
	const [stateSubcription, dispatchSubcription] = useSubcription()
	const [stateStep, dispatchStepper] = useStepper()

	async function handleCustomerSubmit(values, {setSubmitting}) {
		try {
			setError(null)
			if (stateSubcription.customerId === "") {
				const resp = await customerService.createCustomer(values)
				dispatchSubcription({
					type: ADD_CUSTOMER,
					customerId: resp.data.flowCustomerId,
					customer: values
				})
			}
			dispatchStepper({
				type: NEXT_STEP
			})
		} catch (err) {
			setError(err.response.data)
		}
		setSubmitting(false)
	}

	return (
		<>
			{error && error !== null ? (
				<div className="row justify-content-center">
					<div className="col-12 mb-3">
						<Alert type="danger" message={error.message} />
					</div>
				</div>
			) : (
				""
			)}
			<Formik
				initialValues={{
					rut: stateSubcription.customer.rut,
					name: stateSubcription.customer.name,
					lastName: stateSubcription.customer.lastName,
					email: stateSubcription.customer.email
				}}
				validationSchema={validateCustomer()}
				onSubmit={handleCustomerSubmit}
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
						<div className="row justify-content-center">
							<div className="col-6 col-md-8 col-xs-12">
								<div className="mb-3">
									<label>RUT</label>
									<input
										type="text"
										name="rut"
										className={
											"form-control " + (touched.rut && errors.rut ? "is-invalid" : "")
										}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.rut}
									/>
									{touched.rut && errors.rut ? (
										<div className="invalid-feedback">{errors.rut}</div>
									) : (
										""
									)}
								</div>
								<div className="mb-3">
									<label>Nombre</label>
									<input
										type="text"
										name="name"
										className={
											"form-control " + (touched.name && errors.name ? "is-invalid" : "")
										}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.name}
									/>
									{touched.name && errors.name ? (
										<div className="invalid-feedback">{errors.name}</div>
									) : (
										""
									)}
								</div>
								<div className="mb-3">
									<label>Apellidos</label>
									<input
										type="text"
										name="lastName"
										className={
											"form-control " + (errors.lastName && touched.lastName ? "is-invalid" : "")
										}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.lastName}
									/>
									{touched.lastName && errors.lastName ? (
										<div className="invalid-feedback">{errors.lastName}</div>
									) : (
										""
									)}
								</div>
								<div className="mb-3">
									<label>Email</label>
									<input
										type="text"
										name="email"
										className={
											"form-control " + (errors.email && touched.email ? "is-invalid" : "")
										}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
									/>
									{touched.lastName && errors.email ? (
										<div className="invalid-feedback">{errors.email}</div>
									) : (
										""
									)}
								</div>
							</div>
						</div>
						<hr className="mt-4" />
						<div className="d-flex justify-content-around">
							<div className="col-4">
								<PageButtonWizard
									title="Anterior"
									handleStep={() => dispatchStepper({type: PREVIOUS_STEP})}
								/>
							</div>
							<div className="col-4">
								<PageButtonWizard
									type="submit"
									title="Siguiente"
									disabled={!isValid || isSubmitting}
									isLoading={isSubmitting}
								/>
							</div>
						</div>
					</form>
				)}
			</Formik>
		</>
	)
}
