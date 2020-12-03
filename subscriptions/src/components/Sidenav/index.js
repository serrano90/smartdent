/**
 * Sidebar
 */

import React from "react"
import routers from "utils/routers"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import NavItem from "./NavItem"

const menu = [
	{
		url: routers.ADMIN_DASHBOARD,
		icon: "chart-pie"
	},
	{
		url: routers.ADMIN_CUSTOMERS,
		icon: "users"
	}
]

export default function ({handleSignOut, user}) {
	return (
		<>
			<nav
				id="sidebarMenu"
				className="sidebar d-md-block bg-primary text-white collapse"
				data-simplebar
			>
				<div className="sidebar-inner px-4 pt-3">
					<div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
						<div className="d-flex align-items-center">
							<div className="user-avatar lg-avatar mr-4">
								<img
									src="@@path/assets/img/team/profile-picture-3.jpg"
									className="card-img-top rounded-circle border-white"
									alt="Bonnie Green"
								/>
							</div>
							<div className="d-block">
								<h2 className="h6">Hola, {user.username}</h2>
								<a
									className="btn btn-secondary text-dark btn-xs"
									onClick={handleSignOut}
								>
									<span className="mr-2">
										<FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
									</span>
									Salir
								</a>
							</div>
						</div>
						<div className="collapse-close d-md-none">
							<a
								href="#sidebarMenu"
								className="fas fa-times"
								data-toggle="collapse"
								data-target="#sidebarMenu"
								aria-controls="sidebarMenu"
								aria-expanded="true"
								aria-label="Toggle navigation"
							><FontAwesomeIcon icon={['fas', 'times']} /></a>
						</div>
					</div>
					<ul className="nav flex-column">
						{menu.map((item, idx) => (
							<NavItem
								title={item.url.name}
                                url={item.url.route}
                                icon={item.icon}
								active={false}
								key={idx}
							/>
						))}
					</ul>
				</div>
			</nav>
		</>
	)
}
