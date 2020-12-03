/**
 * DescriptionsItemComponent
 */

import React from "react"
import PropTypes from "prop-types"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const DescriptionsItem = ({text}) => {
	return (
		<div className="d-flex mb-1">
			<div className="icon-md icon-primary lh-180 mr-3">
				<FontAwesomeIcon icon={["fas", "check"]} />
			</div>
			<p>{text}</p>
		</div>
	)
}

DescriptionsItem.prototype = {
	text: PropTypes.string.isRequired
}

export default DescriptionsItem
