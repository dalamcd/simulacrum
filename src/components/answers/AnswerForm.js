import React, { useContext, useEffect, useState, useRef } from "react"
import { AvatarContext } from "../avatars/AvatarProvider"
import { CharacterContext, CharacterProvider } from "../characters/CharacterProvider"
import { QuestionContext } from "../questions/QuestionProvider"
import { AnswerContext } from "./AnswerProvider"

export const AnswerForm = props => {

	const [selectedChar, setSelectedChar] = useState(0)

	const { getQuestions, getQuestionById } = useContext(QuestionContext);
	const { answers, addAnswer } = useContext(AnswerContext);
	const { characters, getCharacters, getCharacterById } = useContext(CharacterContext);
	const { getAvatars, getAvatarByCharacterId } = useContext(AvatarContext);

	//const av = useRef();
	const response = useRef();

	useEffect(() => {
		getAvatars()
			.then(getCharacters)
			.then(getQuestions);
	}, [])

	const q = getQuestionById(props.match.params.questionId)

	const addNewAnswer = () => {

		if (!selectedChar) {
			window.alert("Please select a character")
		} else {
			addAnswer({
				userId: localStorage.getItem("app_user_id"),
				avatarId: getAvatarByCharacterId(selectedChar).id,
				characterId: selectedChar,
				questionId: q.id,
				timestamp: Date.now(),
				quoteId: 0,
				response: response.current.value
			})
			props.history.push(`/questions/${props.match.params.questionId}`)
		}
	}

	return (
		<>
			<h2>Answer A Question</h2>
			<div>
				<label htmlFor="name">Character: </label>
				<select onChange={e => setSelectedChar(e.target.value)}>
					<option value="0">Select a character...</option>
					{characters.map(c => {
						return <option key={c.id} value={c.id}>{c.name}</option>
					})}
				</select>
			</div>
			{selectedChar > 0 && <img src={getAvatarByCharacterId(selectedChar).imagePath} />}
			<div>
				Question:
					{q && <div>{q.message}</div>}
			</div>
			<div>
				<label htmlFor="answer">Your response:</label>
				{q && <textarea ref={response}></textarea>}
			</div>
			<button type="submit" className="btn btn-ask-question" onClick={evt => {
				evt.preventDefault()
				addNewAnswer();
			}}>Answer
        	</button>
		</>
	)
}