/**
 * Payment Intent Items
 */

import React from "react"
import PropTypes from "prop-types"
import {DateFormatString} from "utils/date"
import Badge from "components/Badge"
import {conceptSplit} from "./utils"

const PaymentIntentItem = ({
	id,
    subject,
    createdAt,
	amountOriginal,
	currencyOriginal,
	paymentDate,
    amountFinaly,
    currencyFinaly,
    status,
}) => {

    const typeByStatus = () => {
        switch(status) {
            case 1:
                return "info"
            case 2:
                return "success"
            default:
                return "danger"
        }
    }

    const textByStatus = () => {
        switch(status) {
            case 1:
                return "Pendiente"
            case 2:
                return "Pagada"
            case 3:
                return "Rechazada"
            default:
                return "Anulada"
        }
    }

	return (
		<>
			<tr key={id}>

                <td>
					<div className="d-flex align-items-center">
						<div className="d-block">
							<span className="font-weight-normal">{id}</span>
						</div>
					</div>
				</td>

                <td>
					<div className="d-flex align-items-center">
						<div className="d-block">
                            <span className="font-weight-normal">
                                <div dangerouslySetInnerHTML={{__html: conceptSplit(subject)}} />
                            </span>
						</div>
					</div>
				</td>

                <td>
					<span className="font-weight-normal">
						{DateFormatString(paymentDate)}
					</span>
				</td>

                <td>
					<span className="font-weight-normal">
                        {`${amountOriginal} ${currencyOriginal}`}
					</span>
				</td>

                <td>
					<span className="font-weight-normal text-center">
                        { amountFinaly === null ? "-" : amountFinaly + " " + currencyFinaly }
					</span>
				</td>

                <td>
					<Badge size="lg" type={typeByStatus()} text={textByStatus()} />
				</td>

			</tr>
		</>
	)
}

PaymentIntentItem.prototype = {
    id: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
	amountOriginal: PropTypes.string.isRequired,
	currencyOriginal: PropTypes.string.isRequired,
	paymentDate: PropTypes.string.isRequired,
    amountFinaly: PropTypes.string.isRequired,
    currencyFinaly: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
}

export default PaymentIntentItem
