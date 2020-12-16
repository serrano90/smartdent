/**
 * PriceCardComponent
 */

import React from "react"
import PropTypes from "prop-types"
import DescriptionsItem from "./DescriptionsItem"

const PriceCard = ({
	amount,
	currency,
	interval,
	name,
	descriptions,
	planId,
	planIdSelected,
	handleSelectPlan
}) => {

	const onSelect = () => {
		handleSelectPlan(planId, {
			amount: amount,
			name: name,
			currency: currency
		})
	}

	return (
		<div className="col-12 col-lg-6 col-md-6 col-xl-4">
			<div className={"card " + (planIdSelected && planId === planIdSelected ? "border-info border-4" : "border-dark" ) + " shadow-lg mb-3 mt-4"}>
				<div className="card-body pt-5 px-sd-4 px-md-4 px-xl-4">
					<div className="text-center mb-4">
						<div className="mb-4">
							<span className="price display-3 text-primary mb-0">
								$ {amount}
							</span>
							<span className="h6 font-weight-normal align-self-end">
								{" "}
								{currency}/{interval === 3 ? "mes": ""}
							</span>
						</div>
						<h5 className="card-title">{name}</h5>
					</div>
					<div className="list-specification">
						{descriptions ? descriptions.map((v, idx) => (
							<DescriptionsItem text={v} key={idx} />
						)) : ""}
					</div>
					<div className="text-center">
						<button
							className="btn btn-info btn-block"
							type="button"
							onClick={onSelect}
						>
							Seleccionar
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

PriceCard.prototype = {
	amount: PropTypes.number.isRequired,
	currency: PropTypes.string.isRequired,
	interval: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	planId: PropTypes.string.isRequired,
	handleSelectPlan: PropTypes.func.isRequired,
	descriptions: PropTypes.array
}

export default PriceCard
