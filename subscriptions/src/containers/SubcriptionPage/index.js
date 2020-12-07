/**
 * SubcriptionPage
 */
import React from "react"
import Logo from "components/Logo"
import {SubcriptionProvider} from "context/subcriptionContext"
import {StepperProvider} from "context/stepperContext"
import SubcriptionWizard from "./SubcriptionWizard"

const SubcriptionPage = () => {
	return (
		<>
			<div className="container-fluid mt-5 mb-4">
				<div className="row">
					<div className="d-flex justify-content-center">
						<Logo />
					</div>
				</div>
				<div className="row">
					<div className="d-flex justify-content-center">
						<div className="col-lg-6 col-md-10 col-xs-12 mb-4 mt-3">
							<div className="card border-light shadow-sm components-section">
								<div className="card-body">
									<StepperProvider>
										<SubcriptionProvider>
											<SubcriptionWizard />
										</SubcriptionProvider>
									</StepperProvider>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SubcriptionPage
