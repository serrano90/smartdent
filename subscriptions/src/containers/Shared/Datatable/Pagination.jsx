/**
 * Pagination
 */

import React from "react"
import PropTypes from "prop-types"

const pageNeighbours = 2

const Pagination = ({totalRecords, currentPage, onPageChange}) => {
	const pageNumbers = []
	const totalPages = Math.ceil(totalRecords / 10)

	const startPage = Math.max(1, currentPage - pageNeighbours)
	const endPage = Math.min(totalPages, currentPage + pageNeighbours)

	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i)
	}

	return (
		<>
			<nav aria-label="Page navigation example">
				<ul className="pagination mb-0">
					<li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
						<a
							className="page-link"
							onClick={() => onPageChange(currentPage - 1)}
						>
							Anterior
						</a>
					</li>
					{pageNumbers.map((item, idx) => (
						<li
							className={`page-item ${currentPage === idx+1 ? "active" : ""}`}
							key={idx}
						>
							<a className="page-link" onClick={() => onPageChange(item)}>
								{item}
							</a>
						</li>
					))}

					<li className={`page-item ${currentPage >= totalPages ? "disabled" : ""}`}>
						<a
							className="page-link"
							onClick={() => onPageChange(currentPage + 1)}
						>
							Siguiente
						</a>
					</li>
				</ul>
			</nav>
		</>
	)
}

Pagination.prototype = {
	totalRecords: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired
}

export default Pagination
