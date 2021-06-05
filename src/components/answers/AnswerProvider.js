import React, { useState } from "react"

export const AnswerContext = React.createContext();

export const AnswerProvider = props => {

	const [answers, setAnswers] = useState([])

	const getAnswers = () => {
		return fetch("http://localhost:8088/answers")
		.then(res => res.json())
		.then(setAnswers)
	}

	const addAnswer = answer => {
		return fetch("http://localhost:8088/answers",{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(answer)
		})
		.then(getAnswers);
	}

	const deleteAnswer = id => {
		return fetch(`http://localhost:8088/answers/${id}`, {
			method: "DELETE"
		})
		.then(getAnswers)
		
	}

	const getAnswersForQuestionById = id => answers.filter(a => a.questionId === parseInt(id))

	return <AnswerContext.Provider value={{
		answers, getAnswers, getAnswersForQuestionById, addAnswer, deleteAnswer
	}}>
		{props.children}
	</AnswerContext.Provider>

}