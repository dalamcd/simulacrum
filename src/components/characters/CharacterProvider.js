import React, { useState } from "react"

export const CharacterContext = React.createContext();

export const CharacterProvider = props => {

	const [characters, setCharacters] = useState([])

	const getCharacters = () => {
		return fetch("http://localhost:8088/characters")
		.then(res => res.json())
		.then(setCharacters)
	}

	return <CharacterContext.Provider value ={{
		characters, getCharacters
	}}>
		{props.children}
	</CharacterContext.Provider>
}