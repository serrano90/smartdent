/**
 * Information Item
 */
import React from "react"
import PropTypes from "prop-types"

const InformationItem = ({name, data}) => {
	return (
		<div className="d-flex align-items-center justify-content-between border-bottom border-light pb-2 pt-3">
			<div>
				<h6>{name}</h6>
			</div>
			<div>
				{data.type === "text" ? (
					<span className="text-primary font-weight-bold">{data.text}</span>
				) : (
					<span className={"badge badge-lg bg-" + (data.value.type)}>{data.value.text}</span>
				)}
			</div>
		</div>
	)
}

InformationItem.prototype = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
}

export default InformationItem
