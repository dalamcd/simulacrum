import React, { useState } from "react"

export const QuestionContext = React.createContext();

export const QuestionProvider = props => {

	const [questions, setQuestions] = useState([])

	const getQuestions = () => {
		return fetch("http://localhost:8088/questions")
		.then(res => res.json())
		.then(setQuestions)
	}

	return <QuestionContext.Provider value={{
		questions, getQuestions
	}}>
		{props.children}
	</QuestionContext.Provider>

}