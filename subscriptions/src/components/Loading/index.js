/**
 * Loading
 */

import React from "react"
import PropTypes from "prop-types"

const Loading = ({loading}) => {
	if (loading) {
		return (
			<div className="d-flex justify-content-center">
				<div className="spinner-border text-info m-6" role="status" style={{width: "3rem", height: "3rem"}}>
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		)
	} else {
		return ""
	}
}

Loading.prototype = {
	loading: PropTypes.bool.isRequired
}

export default Loading
