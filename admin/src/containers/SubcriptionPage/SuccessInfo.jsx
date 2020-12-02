/**
 * Review
 */

import React from "react"
import useSubcription from "hooks/useSubcription"
import useStepper from "hooks/useStepper"
import PageButtonWizard from "./PageButtonWizard"
import {RESTART_STEP} from "consts/steppers"
import {RESET_DATA} from "consts/subcriptions"
import Alert from "components/Alert"

export default function () {
	const [stateSubcription, dispatchSubcription] = useSubcription()
	const [stateStep, dispatchStepper] = useStepper()

	const submithandle = () => {
		dispatchSubcription({type: RESET_DATA})
		dispatchStepper({type: RESTART_STEP})
	}

	return (
		<>
			<div className="row justify-content-center">
				<div className="col-7">
					<div className="card border-dark shadow-lg mb-3 mt-4">
						<div className="card-body pt-4 px-md-2 px-xl-4">
							<div className="mb-4 mt-3">
								<Alert message="Subscripción creada satisfactoria" type="success"/>
							</div>
							{/* <div className="mt-3">
								<span className="h5 font-weight-bold align-self-end">
									No. Subscripción:
								</span>
								<span className="h5 font-weight-normal align-self-end">
									{" "}
									{stateSubcription.subscriptionId}
								</span>
							</div> */}
							<div className="mt-3">
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
				<div className="col-4"></div>
				<div className="col-4">
					{stateSubcription.card.status ? (
						<PageButtonWizard
							title="Iniciar"
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
