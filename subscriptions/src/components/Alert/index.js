/**
 * Alert Component
 */

import React from "react"

export default function ({message, type}) {
	return (
		<div className={"alert alert-" + type} role="alert">
			<span className="text-white">{message}</span>
		</div>
	)
}
