/**
 * NavBar
 */

import React from "react"
import User from "./User"

export default function({user, handleSignOut}) {
	return (
		<>
			<nav className="navbar navbar-top navbar-expand navbar-dashboard navbar-dark pl-0 pr-2 pb-0">
				<div className="container-fluid px-0">
					<div
						className="d-flex justify-content-end w-100"
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav align-items-center">
							<User handleSignOut={handleSignOut} user={user}/>
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}
