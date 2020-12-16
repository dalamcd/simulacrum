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

	const addAvatarImage = files => {
		const formData = new FormData();

		const file = files[0];
		formData.append("file", file);
		formData.append("upload_preset", "mnvi9b6b");

		return fetch("https://api.cloudinary.com/v1_1/dalamcd/image/upload", {
			method: "POST",
			body: formData
		})
	}

	const getAvatarByCharacterId = id => avatars.find(a => parseInt(a.characterId) === parseInt(id))

	const getAvatarsByCharacterId = id => avatars.filter(a => parseInt(a.characterId) === parseInt(id))

	const getAvatarById = id => avatars.find(a => a.id === parseInt(id))

	return <AvatarContext.Provider value={{
		avatars, getAvatars, addAvatar, addAvatarImage, getAvatarByCharacterId, getAvatarsByCharacterId, getAvatarById
	}}>
		{props.children}
	</AvatarContext.Provider>
}