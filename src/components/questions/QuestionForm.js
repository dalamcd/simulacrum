import React, { useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { CharacterContext } from "../characters/CharacterProvider";
import { QuestionContext } from "./QuestionProvider"
import "./Question.css"
import { NavBar } from "../nav/NavBar";

export const QuestionForm = props => {

	const { addQuestion } = useContext(QuestionContext);
	const { characters, getCharacters } = useContext(CharacterContext);

	const name = useRef();
	const question = useRef()
	const askee = useRef()
	const form = useRef();

	useEffect(() => {
		getCharacters()
	}, [])

	const askNewQuestion = () => {
		if (name.current.value === "") {
			window.alert("Please provide your name.");
		} else if (question.current.value === "") {
			window.alert("Please ask a question.");
		} else {
			addQuestion({
				visitorName: name.current.value,
				message: question.current.value,
				characterId: parseInt(askee.current.value),
				time: Date.now()
			})
			form.current.reset();
			props.history.push("/ask")
		}
	}

	// Thank you for your question. Ask another
	// or <Link to="/questions">view the list of questions</Link>

	return (
		<>
			<NavBar links={[{ to: "/questions", text: "View All Questions" }]} />
			<form ref={form}>
				<h2>Ask a question of the panel</h2>
				<div className="nameInputField">
					<input type="text" id="home__name" ref={name} placeholder="Enter your name..." name="name" />
				</div>
				<div className="questionInputField">
					<textarea ref={question} rows="8" cols="40" placeholder="Enter your question..."></textarea>
				</div>
				<div className="characterSelectField">
					<label htmlFor="wisom">To whom will you direct your question: </label>
					<div className="wisdomSelect">
						<select name="wisdom" ref={askee}>
							{characters.map(c => {
								if (c.primary) return <option key={c.id} value={c.id}>{c.name}</option>
							})}
						</select>
					</div>
				</div>
				<button type="submit" className="askQuestionButton" onClick={evt => {
					evt.preventDefault()
					askNewQuestion()
				}}>
					Ask
        	</button>
			</form>
		</>
	)
}