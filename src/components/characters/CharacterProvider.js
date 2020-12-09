import React, { useState } from "react"

export const CharacterContext = React.createContext();

export const CharacterProvider = props => {

	const [characters, setCharacters] = useState([])

	const getCharacters = () => {
		return fetch("http://localhost:8088/characters")
		.then(res => res.json())
		.then(setCharacters)
	}

	const addCharacter = char => {
		return fetch("http://localhost:8088/characters", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(char)
		})
	}

	return <CharacterContext.Provider value ={{
		characters, getCharacters, addCharacter
	}}>
		{props.children}
	</CharacterContext.Provider>
}