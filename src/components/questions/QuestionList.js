import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
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
				return <Link to={`/questions/${q.id}`} key={q.id}> <div className="question" key={q.id}>{q.message}</div></Link>
			})}
		</section>
		</>
	)
}