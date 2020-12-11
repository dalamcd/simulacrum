import React, { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { AnswerContext } from "./answers/AnswerProvider";
import { CharacterContext } from "./characters/CharacterProvider";
import { QuestionContext } from "./questions/QuestionProvider"

export const Simulacrum = props => {

	const { questions, getQuestions, addQuestion } = useContext(QuestionContext);
	const { answers, getAnswers } = useContext(AnswerContext);
	const { characters, getCharacters } = useContext(CharacterContext);

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
			if(answers.find(a => parseInt(a.questionId) === parseInt(q.id))) {
				results.push(q)
			}
		})
		return results;
	}

	const askNewQuestion = () => {
		addQuestion({
			visitorName: name.current.value,
			message: question.current.value,
			characterId: askee.current.value,
			time: Date.now()
		})
		props.history.push("/ask")
	}

	return (
		<>
			<h2>Ask a question of the panel</h2>
			<div>
				<label htmlFor="name">Your name:</label>
				<input type="text" id="home__name" ref={name} placeholder="Enter your name" name="name" />
			</div>
			<div>
				<label htmlFor="question">Your question:</label>
				<textarea ref={question} defaultValue="Ask a question"></textarea>
			</div>
			<div>
				<label htmlFor="wisom">To whom will you direct your question: </label>
				<select name="wisdom" ref={askee}>
					{characters.map(c => {
						if (c.primary) return <option key={c.id} value={c.id}>{c.name}</option>
					})}
				</select>
			</div>
			<button type="submit" className="btn btn-ask-question" onClick={evt => {
				evt.preventDefault()
				askNewQuestion()
			}}>
				Ask
        	</button>
			<div className="home__recentQuestions">
				{initialQuestions.map(q => {
					return <Link to={`questions/${q.id}`} key={q.id}><div className="home_initialAnswers">{q.message}</div></Link>
				})
				}
			</div>
			<Link to="/admin">Admin</Link>
		</>
	)
}