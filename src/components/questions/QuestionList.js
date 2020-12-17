import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AnswerContext } from "../answers/AnswerProvider";
import { CharacterContext } from "../characters/CharacterProvider";
import { Footer } from "../nav/Footer";
import { NavBar } from "../nav/NavBar";
import { QuestionContext } from "./QuestionProvider"
import "./Question.css"

export const QuestionList = props => {

	const { questions, getQuestions } = useContext(QuestionContext);
	const { answers, getAnswers } = useContext(AnswerContext)
	const { getCharacters, getCharacterById } = useContext(CharacterContext)

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
			.then(getCharacters)
			.then(getQuestions);
	}, [])

	if (localStorage.getItem("app_user_id")) {
		return (
			<>
				<div className="main">

					{localStorage.getItem("app_user_id") ?
						<NavBar links={[{ to: "/", text: "Ask A Question" },
						{ to: "/add", text: "Add A Character" }, { to: `/add/avatar`, text: "Add An Avatar" }]} /> :
						<NavBar links={[{ to: "/", text: "Ask A Question" }]} />
					}
					<section className="questionList">
						<h2>Answered Questions</h2>
						{questionList.map(q => {
							return (
								/*<div key={q.id}>
									<div className="questionListItem">
										<Link to={`/questions/${q.id}`}> {q.message}</Link>
										<button className="answerButton" onClick={() => {
											props.history.push(`/answer/${q.id}`)
										}}>Answer</button>
									</div>
								</div>*/
								<div className="questionListQuestion" key={q.id}>
									<div className="questionContainer">
										<div className="questionTextContainer">
											<div className="question__name">
												<Link to={`/questions/${q.id}`}> <span className="question__visitorName">{q.visitorName}</span> asks
							a question of: <span className="question__characterName">{getCharacterById(q.characterId).name}</span></Link>
											</div>
											<div className="question__text">
												{q.message}
											</div>
										</div>
									</div>
								</div>
							)
						})}
						<h2>Unanswered Questions</h2>
						{unansweredQuestion.map(q => {
							return (
								<div className="questionListQuestion" key={q.id}>
									<div className="questionContainer">
										<div className="questionTextContainer">
											<div className="question__name">
												<Link to={`/questions/${q.id}`}> <span className="question__visitorName">{q.visitorName}</span> asks
						a question of: <span className="question__characterName">{getCharacterById(q.characterId).name}</span></Link>
											</div>
											<div className="question__text">
												{q.message}
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</section>
				</div>
				<Footer />
			</>
		)
	} else {
		return (
			<>
				<NavBar links={[{ to: "/", text: "Ask A Question" }]} />
				<section className="questionList">
					<h2>Answered Questions</h2>
					{questionList.map(q => {
						return (
							<div className="questionListQuestion" key={q.id}>
								<div className="questionContainer">
									<div className="questionTextContainer">
										<div className="question__name">
											<Link to={`/questions/${q.id}`}> <span className="question__visitorName">{q.visitorName}</span> asks
				a question of: <span className="question__characterName">{getCharacterById(q.characterId).name}</span></Link>
										</div>
										<div className="question__text">
											{q.message}
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</section>
				<Footer />
			</>
		)
	}
}