/**
 * PlanInfoStep
 */

import React from "react"
import PropTypes from "prop-types"
import PriceCard from "components/PriceCard"
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
		try {
			const resp = await planService.getPlans()
			setPlans(resp.data)
		} catch (ex) {
			console.log(ex)
		}
	}

	return (
		<>
			<div className="row justify-content-center">
				{plans.map((card, idx) => (
					<PriceCard
						{...card}
						handleSelectPlan={handleSelectPlan}
						planIdSelected={stateSubcription.planId}
						key={idx}
					/>
				))}
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
