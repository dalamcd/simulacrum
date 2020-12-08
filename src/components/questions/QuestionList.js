import React, { useContext, useEffect } from "react"
import { QuestionContext } from "./QuestionProvider"

export const QuestionList = props => {

	const {questions, getQuestions} = useContext(QuestionContext);

	useEffect(() => {
		getQuestions();
	}, [])

	return (
		<>
		<section className="questionList">
			{questions.map(q => {
				<div class="question">q.message</div>
			})}
		</section>
		</>
	)
}