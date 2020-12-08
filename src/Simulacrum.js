import React, { useContext, useEffect, useRef, useState } from "react"
import { AnswerContext } from "./components/answers/AnswerProvider";
import { QuestionContext } from "./components/questions/QuestionProvider"

export const Simulacrum = () => {

	const { addQuestion } = useContext(QuestionContext);
	const { answers, getAnswers } = useContext(AnswerContext);

	const [initialAnswers, setInitialAnswers] = useState([])

	const name = useRef(null);
	const question = useRef(null)
	const askee = useRef(null)

	useEffect(() => {
		getAnswers()
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
			Ask a question of the panel
			<input type="text" id="home__name" ref={name} placeholder="Enter your name" name="name" />
			<textarea ref={question} defaultValue="Ask a question"></textarea>
			<select ref={askee}>
				<option value="1">A</option>
				<option value="2">B</option>
			</select>
			<button type="submit" className="btn btn-ask-question" onClick={evt => {
				evt.preventDefault()
				askNewQuestion()
			}}>
				Ask
        	</button>
			<div className="home__recentQuestions">
				{initialAnswers.map(ans => {
					return ans.response;
				})
				}
			</div>
		</>
	)
}