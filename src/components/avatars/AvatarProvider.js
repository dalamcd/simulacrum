import React, { useState } from "react"

export const AvatarContext = React.createContext();

export const AvatarProvider = props => {

	const [avatars, setAvatars] = useState([])

	const getAvatars = () => {
		return fetch("http://localhost:8088/avatars")
		.then(res => res.json())
		.then(setAvatars)
	}

	return <AvatarContext.Provider value={{
		avatars, getAvatars
	}}>
		{props.children}
	</AvatarContext.Provider>
}