/**
 * PageButtonWizard
 */
import React from "react"

export default function ({title, type, disabled, isLoading, handleStep}) {
	return (
		<>
			{!handleStep ? (
				<button
					type={type}
					className="btn btn-info btn-block"
					disabled={disabled}
				>
                    {isLoading ? <span
						className="spinner-border spinner-border-sm"
						role="status"
						aria-hidden="true"
					></span>: title}
				</button>
			) : (
				<button
					className="btn btn-info btn-block"
					disabled={disabled}
					onClick={() => handleStep()}
				>
					{isLoading ? <span
						className="spinner-border spinner-border-sm"
						role="status"
						aria-hidden="true"
					></span> : title}
				</button>
			)}
		</>
	)
}
