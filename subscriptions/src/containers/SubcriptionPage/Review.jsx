/**
 * Review
 */

import React from "react"
import useSubcription from "hooks/useSubcription"
import useStepper from "hooks/useStepper"
import PageButtonWizard from "./PageButtonWizard"
import SubcriptionsService from "services/api/subcriptions"
import {NEXT_STEP, PREVIOUS_STEP} from "consts/steppers"
import {ADD_SUBSCRIPTION_ID} from "consts/subcriptions"

export default function () {
	const subcriptionsService = new SubcriptionsService()
	const [stateSubcription, dispatchSubcription] = useSubcription()
	const [stateStep, dispatchStepper] = useStepper()
	const [isLoading, setIsLoading] = React.useState(false)

	const submithandle = async () => {
		try {
			setIsLoading(true)
			const resp = await subcriptionsService.addSubcriptions(
				stateSubcription.customerId,
				stateSubcription.planId
			)
			dispatchSubcription({
				type: ADD_SUBSCRIPTION_ID,
				subscriptionsId: resp.data.id
			})
			dispatchStepper({type: NEXT_STEP})
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<div className="row justify-content-center">
				<div className="col-7">
					<div className="card border-dark shadow-lg mb-3 mt-4">
						<div className="card-body pt-4 px-md-2 px-xl-4">
							<div>
								<span className="h5 font-weight-bold align-self-end">
									RUT:
								</span>
								<span className="h5 font-weight-normal align-self-end">
									{" "}
									{stateSubcription.customer.rut}
								</span>
							</div>
							<div className="mt-3">
								<span className="h5 font-weight-bold align-self-end">
									Nombre:
								</span>
								<span className="h5 font-weight-normal align-self-end">
									{" "}
									{stateSubcription.customer.name}{" "}
									{stateSubcription.customer.lastName}
								</span>
							</div>
							<div className="mt-3">
								<span className="h5 font-weight-bold align-self-end">
									Email:
								</span>
								<span className="h5 font-weight-normal align-self-end">
									{" "}
									{stateSubcription.customer.email}
								</span>
							</div>
							<div className="mt-3">
								<span className="h5 font-weight-bold align-self-end">
									Plan:
								</span>
								<span className="h5 font-weight-normal align-self-end">
									{" "}
									{stateSubcription.plan.name}
								</span>
							</div>
							<div className="mt-3">
								<span className="h5 font-weight-bold align-self-end">
									Precio:
								</span>
								<span className="h5 font-weight-normal align-self-end">
									{" "}
									{stateSubcription.plan.amount}{" "}
									{stateSubcription.plan.currency}
								</span>
							</div>
						</div>
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
					{stateSubcription.card.status ? (
						<PageButtonWizard
							title="Aceptar"
							disabled={isLoading}
							isLoading={isLoading}
							handleStep={() => submithandle()}
						/>
					) : (
						""
					)}
				</div>
			</div>
		</>
	)
}
