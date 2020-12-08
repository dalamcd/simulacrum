import React, { useState } from "react"

export const AnswerContext = React.createContext();

export const AnswerProvider = props => {

	const [answers, setAnswers] = useState([])

	const getAnswers = () => {
		return fetch("http://localhost:8088/answerss")
		.then(res => res.json())
		.then(setAnswers)
	}

	return <AnswerContext.Provider value={{
		answers, getAnswers
	}}>
		{props.children}
	</AnswerContext.Provider>

}