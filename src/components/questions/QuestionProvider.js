import React, { useState } from "react"

export const QuestionContext = React.createContext();

export const QuestionProvider = props => {

	const [questions, setQuestions] = useState([])

	const getQuestions = () => {
		return fetch("http://localhost:8088/questions")
		.then(res => res.json())
		.then(setQuestions)
	}

	const addQuestion = question => {
		return fetch("http://localhost:8088/questions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(question)
		})
		.then(getQuestions)
	}

	const getQuestionById = id => questions.find(q => q.id === parseInt(id))

	return <QuestionContext.Provider value={{
		questions, getQuestions, addQuestion, getQuestionById
	}}>
		{props.children}
	</QuestionContext.Provider>

}