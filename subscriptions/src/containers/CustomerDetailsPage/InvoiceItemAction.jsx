/**
 * Invoice Item Actions
 */
import React from "react"
import PropTypes from "prop-types"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const InvoiceItemAction = ({
	id,
	status,
	retryPaymentIntentHandle
}) => {
	return (
		<>
			{status !== 1 && status !== 2 ? (
				<>
					<button
						className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						<span className="icon icon-sm">
							<FontAwesomeIcon icon={["fas", "ellipsis-h"]} />
						</span>
						<span className="sr-only">Toggle Dropdown</span>
					</button>
					<div
						className="dropdown-menu"
						style={{
							position: "absolute",
							transform: "translate3d(-58px, -140px, 0px)",
							top: "0px",
							left: "0px",
							willChange: "transform"
						}}
						x-placement="top-start"
					>
						<button
							className="dropdown-item"
							onClick={() => retryPaymentIntentHandle(id)}
						>
							<FontAwesomeIcon
								className="mr-2"
								icon={["fas", "money-check-alt"]}
							/>{" "}
							Reintentar Cobro
						</button>
					</div>
				</>
			) : (
				"-"
			)}
		</>
	)
}

InvoiceItemAction.prototype = {
	id: PropTypes.number.isRequired,
	status: PropTypes.number.isRequired,
	retryPaymentIntentHandle: PropTypes.func.isRequired
}


export default InvoiceItemAction