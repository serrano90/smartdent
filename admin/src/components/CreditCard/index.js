/**
 * Credit Card
 */

import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export default function ({last4CardDigits, creditCardType}) {
	return (
		<div className="col-5 col-lg-4 col-xl-4">
			<div className="card border-dark shadow-lg mb-2 mt-2 rounded-0">
				<div className="card-body pt-2 pb-2 px-xl-2">
					<div className="icon-md icon-primary lh-180 mr-3">
						<FontAwesomeIcon icon={['fas', 'credit-card']} size="lg"/>
						<span className="h5 font-weight-normal align-self-end">
							{"   **** **** **** "} {last4CardDigits}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
