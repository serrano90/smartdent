/**
 * StepInformationComponent
 */
import React from "react"

export default function ({step, stepTitle, totalSteps}) {
	return (
		<>
			<p>
				Paso <span className="font-weight-bolder">{step}</span> de{" "}
				<span className="font-weight-bolder">{totalSteps}</span>
			</p>
			<h2 className="h5">{stepTitle}</h2>
		</>
	)
}
