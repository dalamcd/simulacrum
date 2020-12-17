import React from "react-router-dom"
import { Link } from "react-router-dom"
import "./Footer.css"

export const Footer = ({admin}) => {
	return (
		<div className="footerMain">
			<span className="footerCopyright footerItem">Copryright 2020 Devin Kent</span>
			{admin ? <div className="footerAdmin footerItem"><Link to="/admin">Admin</Link></div> : ``}
		</div>
	)
}