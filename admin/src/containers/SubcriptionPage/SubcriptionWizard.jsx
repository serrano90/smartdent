/**
 * SubcriptionWizard
 */
import React from "react"
import useStepper from "hooks/useStepper"
import StepInformation from "components/StepInformation"
import {steps} from "./steps"
// Steppers Components
import PlanInfo from "./PlansInfo"
import CustomerInfo from "./CustomerInfo"
import PaymentMethod from "./PaymentMethod"
import Review from "./Review"
import SuccessInfo from "./SuccessInfo"

export default function SubcriptionWizard() {
	const [stepState] = useStepper()

	return (
		<>
			<StepInformation
				step={stepState.step + 1}
				stepTitle={steps[stepState.step].title}
				totalSteps={steps.length}
			/>
			{steps[stepState.step].id === "plan" && <PlanInfo />}
			{steps[stepState.step].id === "basic" && <CustomerInfo />}
			{steps[stepState.step].id === "payment" && <PaymentMethod />}
			{steps[stepState.step].id === "review" && <Review />}
			{steps[stepState.step].id === "success" && <SuccessInfo />}
		</>
	)
}
