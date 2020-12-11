import { Route, Redirect } from "react-router-dom"
import { NavBar } from "../nav/NavBar"

export const Admin = props => {

	return (
	<>
	<Route render={() => {
		// The user id is saved under the key app_user_id in local Storage. Change below if needed!
		if (localStorage.getItem("app_user_id")) {
			return (
				<>
					<NavBar links={[{to: "/", text: "Ask A Question"}, {to: "/questions", text: "View Questions"},
					{to: "/add", text: "Add a Character"}]} />
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