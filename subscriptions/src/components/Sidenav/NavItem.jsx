/**
 * SidenavItem
 */

import React from "react"
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ({active, icon, title, url}) {
	return (
		<li className={"nav-item" + (active ? " active" : "")}>
			<Link className="nav-link" to={url}>
				<span className="sidebar-icon">
					<FontAwesomeIcon icon={['fas', icon]} />
				</span>
				<span>{title}</span>
			</Link>
		</li>
	)
}
