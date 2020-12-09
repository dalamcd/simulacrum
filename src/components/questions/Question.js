import React, { useContext, useEffect } from "react"
import { AnswerContext } from "../answers/AnswerProvider";
import { QuestionContext } from "./QuestionProvider"

export const Question = props => {

	const { getQuestions, getQuestionById } = useContext(QuestionContext);
	const { answers, getAnswers, getAnswersForQuestionById } = useContext(AnswerContext)

	useEffect(() => {
		getAnswers()
			.then(getQuestions)
	}, [])

	const question = getQuestionById(props.match.params.questionId);
	if (question) {
		const answerRels = getAnswersForQuestionById(question.id);
		const qAnswers = answerRels.map(ar => {
			if (ar.questionId === question.id)
				return answers.find(a => a.id === ar.answerId)
		})
	}

	const listQuestion = q => {
		if (q) {
			const answerRels = getAnswersForQuestionById(q.id);
			const qAnswers = answerRels.map(ar => {
				if (ar.questionId === q.id)
					return answers.find(a => a.id === ar.id)
			})

		return (
			<div>
				<div className="questionTitle">{question.message}</div>
				<div className="questionResponses">{qAnswers.map(qa => <div key={qa.id} className="questionResponse">{qa.response}</div>)}</div>
			</div>
		)
	}
}

return (
	<>
		{listQuestion(question)}
		{/* {question ? question.message : ""} */}
		{/* {qAnswers.map(qa => qa.response)} */}
	</>
)
}