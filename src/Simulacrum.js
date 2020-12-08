import React, { useContext, useEffect, useRef, useState } from "react"
import { AnswerContext } from "./components/answers/AnswerProvider";
import { CharacterContext } from "./components/characters/CharacterProvider";
import { QuestionContext } from "./components/questions/QuestionProvider"

export const Simulacrum = () => {

	const { addQuestion } = useContext(QuestionContext);
	const { answers, getAnswers } = useContext(AnswerContext);
	const { characters, getCharacters } = useContext(CharacterContext);

	const [initialAnswers, setInitialAnswers] = useState([])

	const name = useRef(null);
	const question = useRef(null)
	const askee = useRef(null)

	useEffect(() => {
		getAnswers()
			.then(getCharacters)
	}, [])

	useEffect(() => {
		let tmp = [];
		for (let i = 0; i <= 2; i++) {
			if (answers[i]) {
				tmp.push(answers[i])
			}
		}
		setInitialAnswers(tmp);
	}, [answers])

	const askNewQuestion = () => {
		addQuestion({
			visitorName: name.current.value,
			message: question.current.value,
			characterId: askee.current.value,
			time: Date.now()
		})
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
						if (c.primary) return <option value={c.id}>{c.name}</option>
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
				{initialAnswers.map(ans => {
					return <div className="home_initialAnswers">{ans.response}</div>
				})
				}
			</div>
		</>
	)
}