/**
 * Select Subscriptions Plan
 */

import React from "react"
import {useFormik} from "formik"
import {validateSubscription} from "validations/subscription"
import SpinnerButton from "components/Button/Spinner"
import PlanService from "services/api/plan"

const SubscriptionDataModal = ({createSubscriptionsHandle}) => {
    const planService = new PlanService()
    const newSubscriptionsModal = document.getElementById("modal-new-subscription")
    const [plans, setPlans] = React.useState([])
    
    React.useEffect(() => {
		loadPlans()
	}, [])

	const loadPlans = async () => {
		try {
			const resp = await planService.getPlans()
			setPlans(resp.data)
		} catch (err) {
			setPlans([])
		}
    }

    const [error, setError] = React.useState(null)
	const newSubscriptionForm = useFormik({
		initialValues: {
			planId: "",
		},
		validationSchema: validateSubscription(),
		onSubmit: handleSubmit
	})

	if (newSubscriptionsModal) {
		newSubscriptionsModal.addEventListener("hidden.bs.modal", function (event) {
			setError()
			clearData()
		})
	}

	const clearData = () => {
		newSubscriptionForm.resetForm({
			planId: "",
		})
	}

	async function handleSubmit(values, {setSubmitting}) {
		const resp = await createSubscriptionsHandle(values.planId)

		if (resp) {
			document
				.getElementById("modal-new-subscription")
				.getElementsByClassName("btn-close")[0]
				.click()

		}
		setSubmitting(false)
	}
    
    return (
		<>
			<div
				className="modal fade"
				id="modal-new-subscription"
				tabIndex={-1}
				aria-labelledby="modal-new-subscription"
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
									<h2 className="mb-0 h5">Crear Subscripcion</h2>
								</div>
								<div className="card-body">
									<form onSubmit={newSubscriptionForm.handleSubmit}>
										<div className="form-group mb-4">
											<label>Plan</label>
											<select
												name="planId"
												className={
													"form-control " +
													(newSubscriptionForm.errors.planId &&
                                                        newSubscriptionForm.touched.planId
														? "is-invalid"
														: "")
												}
												placeholder="Seleccione un Plan"
												value={newSubscriptionForm.values.planId}
												onChange={newSubscriptionForm.handleChange}
												onBlur={newSubscriptionForm.handleBlur}
											>
                                                <option value="">Seleccione un plan</option>
                                                {plans.map((item) => {
                                                    return <option value={item.planId} key={item.planId}>{item.name}</option>
                                                })}
                                            </select>
											{newSubscriptionForm.touched.planId &&
											newSubscriptionForm.errors.planId ? (
												<div className="invalid-feedback">
													{newSubscriptionForm.errors.planId}
												</div>
											) : (
												""
											)}
										</div>
										<div className="col-12 d-flex justify-content-end">
											<SpinnerButton
												title="Crear"
												type="info"
												isLoading={newSubscriptionForm.isSubmitting}
												disabled={
													!newSubscriptionForm.isValid ||
													newSubscriptionForm.isSubmitting
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

export default SubscriptionDataModal