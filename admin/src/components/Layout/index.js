/**
 * Admin Layout
 */

import React from "react"
import NavMobile from "./NavMobile"
import Navbar from "components/Navbar"
import Sidenav from "components/Sidenav"
import Footer from "components/Footer"

export default function ({children, handleSignOut, user}) {
	return (
		<>
			{user && user !== null ? (
				<div>
					<NavMobile />
					<div className="container-fluid bg-soft">
						<div className="row">
							<div className="col-12">
								<Sidenav handleSignOut={handleSignOut} user={user} />
								<main className="content">
									<Navbar handleSignOut={handleSignOut} user={user} />
									{children}
									<Footer />
								</main>
							</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</>
	)
}
