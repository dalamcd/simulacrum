import React, { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { AnswerContext } from "./answers/AnswerProvider";
import { CharacterContext } from "./characters/CharacterProvider";
import { Footer } from "./nav/Footer";
import { QuestionForm } from "./questions/QuestionForm";
import { QuestionContext } from "./questions/QuestionProvider"
import "./Simulacrum.css"

export const Simulacrum = props => {

	const { questions, getQuestions, addQuestion } = useContext(QuestionContext);
	const { answers, getAnswers } = useContext(AnswerContext);
	const { characters, getCharacters, getCharacterById } = useContext(CharacterContext);

	const [initialQuestions, setInitialQuestions] = useState([])

	const name = useRef(null);
	const question = useRef(null)
	const askee = useRef(null)

	useEffect(() => {
		getAnswers()
			.then(getQuestions)
			.then(getCharacters)
	}, [])

	useEffect(() => {
		let tmp = [];
		let qtmp = getQuestionsWithAnswers()
		for (let i = 0; i <= 2; i++) {
			if (qtmp[i]) {
				tmp.push(qtmp[i])
			}
		}
		setInitialQuestions(tmp);
	}, [questions])

	const getQuestionsWithAnswers = () => {
		let results = [];
		questions.forEach(q => {
			if (answers.find(a => parseInt(a.questionId) === parseInt(q.id))) {
				results.push(q)
			}
		})
		return results;
	}

	const askNewQuestion = () => {
		if (name.current.value === "") {
			window.alert("Please provide your name.");
		} else if (question.current.value === "") {
			window.alert("Please ask a question.");
		} else {
			addQuestion({
				visitorName: name.current.value,
				message: question.current.value,
				characterId: askee.current.value,
				time: Date.now()
			})
			props.history.push("/ask")
		}
	}

	return (
		<>
			{props.location.pathname === "/ask" ? <h2>Thank you for your question. </h2> : ``}
			<QuestionForm {...props} />
			<h2>Recently Answered Questions</h2>
			<div className="home__recentQuestions">
				{initialQuestions.map(q => {
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
				})
				}
			</div>
			<Footer admin={true} />
		</>
	)
}