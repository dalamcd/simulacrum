import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({links}) => {

	const formatLinks = () => {
		return links.map(l => {
			return (
			<li key={l.to} className="navbar__item">
				<Link key={l.text} className="navbar__link" to={l.to}>{l.text}</Link>
			</li>
			)
		})
	}

    return (
        <ul className="navbar">
            {formatLinks()}
        </ul>
    )
}