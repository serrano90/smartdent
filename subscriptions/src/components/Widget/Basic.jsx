/**
 * Widget Basic
 */
import React from "react"

const Basic = ({title, total}) => {
	return (
		<>
			<div className="card border-light shadow-sm">
				<div className="card-body">
					<h2 className="h5">{title}</h2>
					<h3 className="h2 mb-1 text-center">{total}</h3>
				</div>
			</div>
		</>
	)
}

export default Basic
