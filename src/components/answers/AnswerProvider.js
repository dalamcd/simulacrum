import React, { useState } from "react"

export const AnswerContext = React.createContext();

export const AnswerProvider = props => {

	const [answers, setAnswers] = useState([])

	const getAnswers = () => {
		return fetch("http://localhost:8088/answers")
		.then(res => res.json())
		.then(setAnswers)
	}

	const getAnswersForQuestionById = id => answers.filter(a => a.questionId === parseInt(id))

	return <AnswerContext.Provider value={{
		answers, getAnswers, getAnswersForQuestionById
	}}>
		{props.children}
	</AnswerContext.Provider>

}