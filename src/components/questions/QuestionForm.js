import React, { useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { CharacterContext } from "../characters/CharacterProvider";
import { QuestionContext } from "./QuestionProvider"

export const QuestionForm = props => {

	const { addQuestion } = useContext(QuestionContext);
	const { characters, getCharacters } = useContext(CharacterContext);

	const name = useRef(null);
	const question = useRef(null)
	const askee = useRef(null)

	useEffect(() => {
		getCharacters()
	}, [])

	const askNewQuestion = () => {
		addQuestion({
			visitorName: name.current.value,
			message: question.current.value,
			characterId: parseInt(askee.current.value),
			time: Date.now()
		})
		props.history.push("/ask")
	}

	return (
		<>
			Thank you for your question. Ask another 
			or <Link to="/questions">view the list of questions</Link>
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
		</>
	)
}