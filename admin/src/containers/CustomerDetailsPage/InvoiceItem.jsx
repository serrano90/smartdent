/**
 * Invoices Items
 */

import React from "react"
import PropTypes from "prop-types"
import {DateFormatString} from "utils/date"
import Badge from "components/Badge"
import Loading from "components/Loading"
import InvoiceItemAction from "./InvoiceItemAction"
import {conceptSplit} from "./utils"

const InvoiceItem = ({
	id,
	subject,
	amount,
	currency,
	status,
	createdAt,
	nextPaymentIntent,
	retryPaymentIntentHandle,
	isLoadingActions
}) => {
	const typeByStatus = () => {
		switch (status) {
			case 1:
				return "success"
			case 2:
				return "warning"
			default:
				return "danger"
		}
	}

	const textByStatus = () => {
		switch (status) {
			case 1:
				return "Pagado"
			case 2:
				return "Anulado"
			default:
				return "Impago"
		}
	}

	return (
		<>
			<tr key={id}>
				<td>
					<div className="d-flex align-items-center">
						<div className="d-block">
							<span className="font-weight-normal">
								<div
									dangerouslySetInnerHTML={{__html: conceptSplit(subject)}}
								/>
							</span>
						</div>
					</div>
				</td>

				<td className="text-center">
					<span className="font-weight-normal">{`${amount} ${currency}`}</span>
				</td>

				<td className="text-center">
					<span className="font-weight-normal">
						{DateFormatString(createdAt)}
					</span>
				</td>

				<td className="text-center">
					<Badge size="lg" type={typeByStatus()} text={textByStatus()} />
				</td>

				<td className="text-center">
					{isLoadingActions ? (
						<Loading />
					) : (
						<InvoiceItemAction
							id={id}
							status={status}
							retryPaymentIntentHandle={retryPaymentIntentHandle}
						/>
					)}
				</td>
			</tr>
		</>
	)
}

InvoiceItem.prototype = {
	id: PropTypes.number.isRequired,
	subject: PropTypes.string.isRequired,
	amount: PropTypes.string.isRequired,
	currency: PropTypes.string.isRequired,
	status: PropTypes.number.isRequired,
	creationDate: PropTypes.string,
	nextPaymentIntent: PropTypes.string,
	retryPaymentIntentHandle: PropTypes.func.isRequired,
	isLoadingActions: PropTypes.bool.isRequired,
}

export default InvoiceItem
