/**
 * Breadcrumb
 */

import React from "react"
import {Link} from "react-router-dom"

const Breadcrumb = ({links}) => {
	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb breadcrumb-primary breadcrumb-transparent">
				{links.map((v, idx) => {
					if (idx + 1 === links.length) {
						return (
							<li className="breadcrumb-item active" aria-current="page" key={idx}>
								{v.name}
							</li>
						)
					} else {
						return (
							<li className="breadcrumb-item" key={idx}>
								<Link to={v.link}>{v.name}</Link>
							</li>
						)
					}
				})}
			</ol>
		</nav>
	)
}

export default Breadcrumb
