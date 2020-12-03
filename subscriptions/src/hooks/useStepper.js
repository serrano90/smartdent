/**
 * StepperContext
 */
import React from "react"
import {StepperContext} from "context/stepperContext"

export default function useStepper() {
    const contextValue = React.useContext(StepperContext)
	return contextValue
}
