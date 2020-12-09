import React, { useContext, useEffect, useState, setState } from "react"
import { QuestionContext } from "./QuestionProvider"

export const QuestionList = props => {

	const {questions, getQuestions} = useContext(QuestionContext);
	
	const [questionList, setQuestionList] = useState([])

	useEffect(() => {
		setQuestionList(questions)
	}, [questions])

	useEffect(() => {
		getQuestions();
	}, [])


	return (
		<>
		<section className="questionList">
			Questions: 
			{questionList.map(q => {
				return <div className="question" key={q.id}>{q.message}</div>
			})}
		</section>
		</>
	)
}