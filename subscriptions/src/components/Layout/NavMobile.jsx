/**
 * Nav Mobile
 */

import React from "react"
import {Link} from "react-router-dom"
import Logo from "components/Logo"
import routers from "utils/routers"

export default function () {
	return (
		<nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-md-none">
			<Link className="navbar-brand mr-lg-5" to={routers.ADMIN.path}>
				<Logo />
			</Link>
			<div className="d-flex align-items-center">
				<button
					className="navbar-toggler d-md-none collapsed"
					type="button"
					data-toggle="collapse"
					data-target="#sidebarMenu"
					aria-controls="sidebarMenu"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
			</div>
		</nav>
	)
}
