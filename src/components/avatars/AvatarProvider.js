import React, { useState } from "react"

export const AvatarContext = React.createContext();

export const AvatarProvider = props => {

	const [avatars, setAvatars] = useState([])

	const getAvatars = () => {
		return fetch("http://localhost:8088/avatars")
		.then(res => res.json())
		.then(setAvatars)
	}

	const addAvatar = av => {
		return fetch("http://localhost:8088/avatars", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(av)
		})
		.then(getAvatars);
	}

	const addAvatarImage = file => {
		
	}

	return <AvatarContext.Provider value={{
		avatars, getAvatars, addAvatar
	}}>
		{props.children}
	</AvatarContext.Provider>
}