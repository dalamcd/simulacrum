import { Route, Redirect, Link } from "react-router-dom"

export const Admin = props => {

	return (
	<>
	<Route render={() => {
		// The user id is saved under the key app_user_id in local Storage. Change below if needed!
		if (localStorage.getItem("app_user_id")) {
			return (
				<>
						<div><Link to="/questions">View questions</Link></div>
						<div><Link to="/add">Add a character</Link></div>
				</>
			)
		} else {
			return <Redirect to="/login" />
		}
	}} />

	{/* <Route path="/register" render={props => <Register {...props} />} /> */}
	</>
	)
}