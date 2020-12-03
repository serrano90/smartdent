/**
 * Button with Spinner
 */
import React from "react"
import PropTypes from "prop-types"

const SpinnerButton = ({title, type, disabled, isLoading, onClick, marginRight = 0}) => {
	return (
		<>
			{!onClick ? (
				<button
					type="submit"
					className={"btn btn-" + type + " btn-md mt-2 animate-up-2 mr-"+marginRight}
					disabled={disabled || isLoading}
				>
					{isLoading ? (
						<span
							className="spinner-border spinner-border-sm"
							role="status"
							aria-hidden="true"
						></span>
					) : (
						title
					)}
				</button>
			) : (
				<button
					type="button"
					className={"btn btn-" + type + " btn-md mt-2 animate-up-2 mr-"+marginRight}
					disabled={disabled || isLoading}
					onClick={() => onClick()}
				>
					{isLoading ? (
						<span
							className="spinner-border spinner-border-sm"
							role="status"
							aria-hidden="true"
						></span>
					) : (
						title
					)}
				</button>
			)}
		</>
	)
}

SpinnerButton.prototype = {
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	marginRight: PropTypes.number,
	onClick: PropTypes.func
}

export default SpinnerButton
