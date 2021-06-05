import React, { useState } from "react"

export const CharacterContext = React.createContext();

export const CharacterProvider = props => {

	const [characters, setCharacters] = useState([])

	const getCharacters = () => {
		return fetch("http://170.187.156.238/characters")
		.then(res => res.json())
		.then(setCharacters)
	}

	const addCharacter = char => {
		return fetch("http://170.187.156.238/characters", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(char)
		})
	}

	const getCharacterById = id => characters.find(c => c.id === parseInt(id))

	return <CharacterContext.Provider value ={{
		characters, getCharacters, addCharacter, getCharacterById
	}}>
		{props.children}
	</CharacterContext.Provider>
}