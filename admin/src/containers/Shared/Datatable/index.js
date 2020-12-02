/**
 * DataTable Container
 */

import React from "react"
import PropTypes from "prop-types"
import Pagination from "./Pagination"

const DataTable = ({
	headers,
	rows,
	currentPage,
	totalRecords,
	initialRecords,
	finishRecords,
	onPageChange
}) => {
	return (
		<>
			<div className="card card-body border-light shadow-sm table-wrapper table-responsive pt-0">
				<table className="table user-table table-hover align-items-center">
					<thead>
						<tr>
							{headers.map((column, idx) => {
								return (
									<th className="border-bottom" key={idx}>
										{column.name}
									</th>
								)
							})}
						</tr>
					</thead>
					<tbody>
						{rows.length === 0 ? (
							<tr className="text-center mt-4 mb-4">
								<td colSpan="4">
									<span>No existe valores registrado</span>
								</td>
							</tr>
						) : (
							rows.map((row) => row)
						)}
					</tbody>
				</table>
				<div className="card-footer px-3 border-0 d-flex align-items-center justify-content-between">
					<div className="font-weight-bold small">
						Mostrando del{" "}
						<b>
							{initialRecords} - {finishRecords > totalRecords ? totalRecords : finishRecords}
						</b>{" "}
						de <b>{totalRecords}</b> resultados
					</div>
					{totalRecords >= 10 ? (
						<Pagination
							currentPage={currentPage}
							totalRecords={totalRecords}
							onPageChange={onPageChange}
						/>
					) : (
						""
					)}
				</div>
			</div>
		</>
	)
}

DataTable.prototype = {
	headers: PropTypes.array.isRequired,
	rows: PropTypes.array.isRequired,
	currentPage: PropTypes.number.isRequired,
	totalRecords: PropTypes.number.isRequired,
	initialRecords: PropTypes.number.isRequired,
	finishRecords: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired
}

export default DataTable
