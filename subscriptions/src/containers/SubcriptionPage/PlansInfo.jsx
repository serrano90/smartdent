/**
 * PlanInfoStep
 */

import React from "react"
import PropTypes from "prop-types"
import Alert from "components/Alert"
import PriceCard from "components/PriceCard"
import Loading from "components/Loading"
import useSubcription from "hooks/useSubcription"
import useStepper from "hooks/useStepper"
import {ADD_PLAN} from "consts/subcriptions"
import {NEXT_STEP} from "consts/steppers"
import PlanService from "services/api/plan"
import PageButtonWizard from "./PageButtonWizard"

const PlanInfo = () => {
	const planService = new PlanService()
	const [stateSubcription, dispatchSubcription] = useSubcription()
	const [stepState, dispatchStepper] = useStepper()
	const [plans, setPlans] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)
	const [error, setError] = React.useState()

	React.useEffect(() => {
		loadPlans()
	}, [])

	const handleSelectPlan = (id, plan) => {
		dispatchSubcription({
			type: ADD_PLAN,
			planId: id,
			plan: plan
		})
	}

	const loadPlans = async () => {
		setIsLoading(true)
		setError()
		try {
			const resp = await planService.getPlans()
			setPlans(resp.data)
		} catch (ex) {
			console.log(ex)
			setError("No se han encontrado planes activos")
		}
		setIsLoading(false)
	}

	return (
		<>
			<div className="row justify-content-center">
				<Loading loading={isLoading} />
				{error && error !== null ? (
					<div className="row justify-content-center pt-2 mb-7">
						<div className="col-12 mb-3">
							<Alert type="danger" message={error} />
						</div>
					</div>
				) : (
					<>
						{plans.map((card, idx) => (
							<PriceCard
								{...card}
								handleSelectPlan={handleSelectPlan}
								planIdSelected={stateSubcription.planId}
								key={idx}
							/>
						))}
					</>
				)}	
			</div>
			<hr className="mt-4" />
			<div className="d-flex justify-content-around">
				<div className="col-4"></div>
				<div className="col-4">
					<PageButtonWizard
						title="Siguiente"
						disabled={stateSubcription.planId === ""}
						handleStep={() => dispatchStepper({type: NEXT_STEP})}
					/>
				</div>
			</div>
		</>
	)
}

PlanInfo.prototype = {
	plans: PropTypes.array.isRequired,
	handleSelectPlan: PropTypes.func.isRequired
}

export default PlanInfo
