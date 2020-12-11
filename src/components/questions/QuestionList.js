import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AnswerContext } from "../answers/AnswerProvider";
import { NavBar } from "../nav/NavBar";
import { QuestionContext } from "./QuestionProvider"

export const QuestionList = props => {

	const { questions, getQuestions } = useContext(QuestionContext);
	const { answers, getAnswers } = useContext(AnswerContext)

	const [questionList, setQuestionList] = useState([])
	const [unansweredQuestion, setUnansweredQuestions] = useState([])

	useEffect(() => {
		let answered = [];
		let unanswered = [];
		questions.forEach(q => {
			if (answers.find(a => parseInt(a.questionId) === parseInt(q.id))) {
				answered.push(q)
			} else {
				unanswered.push(q);
			}
		})
		setQuestionList(answered)
		setUnansweredQuestions(unanswered)
	}, [questions])

	useEffect(() => {
		getAnswers()
			.then(getQuestions);
	}, [])

	if (localStorage.getItem("app_user_id")) {
		return (
			<>
			<h2>Answered questions</h2>
			<NavBar links={[{to: "/", text: "Ask A Question"}, {to: "/add", text:"Add A Character"}]} />
				<section className="questionList">
					Questions:
			{questionList.map(q => {
					return (
						<div key={q.id}>
							<Link to={`/questions/${q.id}`}> <div className="question">{q.message}</div></Link>
							<button onClick={() => {
								props.history.push(`/answer/${q.id}`)
							}}>Answer</button>
						</div>
					)
				})}
				<h2>Unanswered questions</h2>
			{unansweredQuestion.map(q => {
					return (
						<div key={q.id}>
							<Link to={`/questions/${q.id}`}> <div className="question">{q.message}</div></Link>
							<button onClick={() => {
								props.history.push(`/answer/${q.id}`)
							}}>Answer</button>
						</div>
					)
				})}
				</section>
			</>
		)
	} else {
		return (
			<>
			<NavBar links={[{to: "/", text: "Ask A Question"}]} />
				<section className="questionList">
					Questions:
			{questionList.map(q => {
					return <Link to={`/questions/${q.id}`} key={q.id}> <div className="question" key={q.id}>{q.message}</div></Link>
				})}
				</section>
			</>
		)
	}
}