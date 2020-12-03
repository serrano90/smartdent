/**
 * Change Intent Failed Items
 */

import React from "react"
import PropTypes from "prop-types"
import {DateFormatString} from "utils/date"

const ChargeIntentFailedItem = ({
	id,
    invoiceId,
    createdAt,
	amount,
	currency,
	errorCode,
	errorDescription,
}) => {

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
							<span className="font-weight-normal">{invoiceId}</span>
						</div>
					</div>
				</td>
				
				<td>
					<span className="font-weight-normal">
                        {`${amount} ${currency}`}
					</span>
				</td>

                <td>
					<span className="font-weight-normal">
						{DateFormatString(createdAt)}
					</span>
				</td>

                {/* <td>
					<div className="d-flex align-items-center">
						<div className="d-block">
							<span className="font-weight-normal">{`${errorCode}: ${errorDescription}:`}</span>
						</div>
					</div>
				</td> */}

			</tr>
		</>
	)
}

ChargeIntentFailedItem.prototype = {
    id: PropTypes.number.isRequired,
    invoiceId: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
	amount: PropTypes.string.isRequired,
	currency: PropTypes.string.isRequired,
	errorCode: PropTypes.number.isRequired,
	errorDescription: PropTypes.string,
}

export default ChargeIntentFailedItem
