/**
 * CustomerList
 */
import React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import routers from "utils/routers"
import {DateFormatString} from "utils/date"
import Badge from "components/Badge"

const CustomerListItem = ({
	id,
	fullName,
	email,
	status,
	rut,
	createdAt,
	data,
	onClickRow
}) => {
	const initialLetter = fullName.charAt(0).toUpperCase()

	return (
		<tr onClick={onClickRow} role="button">
			<td>
				<Link
					to={routers.ADMIN_CUSTOMERS.route + "/" + id}
					className="d-flex align-items-center"
				>
					<div className="user-avatar rounded-circle mr-3 bg-info" alt="Avatar">
						<span>{initialLetter}</span>
					</div>
					<div className="d-block">
						<span className="font-weight-bold">{fullName}</span>
						<div className="small text-gray">{email}</div>
					</div>
				</Link>
			</td>
			<td>
				<span className="font-weight-normal">
					{rut}
				</span>
			</td>
			<td>
				<span className="font-weight-normal">
					{status ? (
						<Badge text={"Activo"} type={"success"} size="lg"/>
					) : (
						<Badge text={"Inactivo"} type={"danger"} size="lg"/>
					)}
				</span>
			</td>
			<td>
				<span className="font-weight-normal">
					{data !== null ? data.subscription.plan : "-"}
				</span>
			</td>
			<td>
				<span className="font-weight-normal">
					{data !== null && data.plan && data.plan !== null ? data.plan.amount + " " + data.plan.currency : "-"}
				</span>
			</td>
			<td>
				<span className="font-weight-normal">{DateFormatString(createdAt)}</span>
			</td>
		</tr>
	)
}

CustomerListItem.prototype = {
	id: PropTypes.string.isRequired,
	fullName: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	status: PropTypes.number.isRequired,
	rut: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	onClickRow: PropTypes.func,
	data: PropTypes.object.isRequired
}

export default CustomerListItem
