/**
 * User
 */

import React from "react"
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import routers from "utils/routers"

export default function ({ user, handleSignOut }) {
	return (
		<li className="nav-item dropdown">
			<a
				className="nav-link pt-1 px-0"
				href="#"
				role="button"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				<div className="media d-flex align-items-center">
				<div className="user-avatar bg-info"><span>A</span></div>
					<div className="media-body ml-2 text-dark align-items-center d-none d-lg-block">
						<span className="mb-0 font-small font-weight-bold">
							{user && user !== null ? user.username : ""}
						</span>
					</div>
				</div>
			</a>
			<div className="dropdown-menu dashboard-dropdown dropdown-menu-right mt-2">
				<Link className="dropdown-item font-weight-bold" to={routers.ADMIN_CHANGE_PASSWORD.route}>
					<span className="far fa-user-circle"></span>Cambio de Contraseña
				</Link>
				<div role="separator" className="dropdown-divider"></div>
				<a className="dropdown-item font-weight-bold" onClick={() => handleSignOut()}>
					<FontAwesomeIcon icon={['fas', 'sign-out-alt']} /> Salir
				</a>
			</div>
		</li>
	)
}
