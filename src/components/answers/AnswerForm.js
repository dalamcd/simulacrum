import React, { useContext, useEffect, useState, useRef } from "react"
import { Redirect } from "react-router-dom"
import { AvatarContext } from "../avatars/AvatarProvider"
import { CharacterContext } from "../characters/CharacterProvider"
import { QuestionContext } from "../questions/QuestionProvider"
import { AnswerContext } from "./AnswerProvider"
import "./Answer.css"
import { NavBar } from "../nav/NavBar"
import { Footer } from "../nav/Footer"

export const AnswerForm = props => {

	const [selectedChar, setSelectedChar] = useState(0);
	const [selectedAv, setSelectedAv] = useState(0);

	const { getQuestions, getQuestionById } = useContext(QuestionContext);
	const { addAnswer } = useContext(AnswerContext);
	const { characters, getCharacters } = useContext(CharacterContext);
	const { getAvatars, getAvatarByCharacterId, getAvatarById, getRandomAvatarsByCharacterId,
		getNonRandomAvatarsByCharacterId } = useContext(AvatarContext);

	//const av = useRef();
	const response = useRef();
	const radio = useRef();
	const form = useRef();

	let randomAv = Math.floor(Math.random() * getRandomAvatarsByCharacterId(selectedChar).length);

	useEffect(() => {
		// This is hacky and bad and I hate it. There MUST be a better way to find defaultChecked on a radio group, but
		// so far I am unable to find it.
		if (form.current.elements) {
			if (form.current.elements.length > randomAv) {
				form.current.elements[randomAv].checked = true;
				setSelectedAv(getAvatarById(form.current.elements[randomAv].value).id)
			}
		}
	}, [selectedChar])

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
				userId: parseInt(localStorage.getItem("app_user_id")),
				avatarId: parseInt(selectedAv),
				characterId: parseInt(selectedChar),
				questionId: q.id,
				timestamp: Date.now(),
				quoteId: 0,
				response: response.current.value
			})
			props.history.push(`/questions/${props.match.params.questionId}`)
		}
	}
	if (localStorage.getItem("app_user_id")) {
		return (
			<>
				<NavBar links={[{ to: "/", text: "Ask A Question" }, { to: "/questions", text: "View All Questions" },
				{ to: "/add", text: "Add A Character" }, { to: "/add/avatar", text: "Add An Avatar" }]} />
				<h2>Answer A Question</h2>
				<div className="answerFields">
					<div className="characterSelectField">
						<select onChange={e => {
							setSelectedChar(e.target.value)
						}}>
							<option value="0">Select a character...</option>
							{characters.map(c => {
								if ((c.global || c.userId === parseInt(localStorage.getItem("app_user_id")) && c.id !== 1))
									return <option key={c.id} value={c.id}>{c.name}</option>
							})}
						</select>
					</div>
					<form ref={form}>
						<div class="characterAvatars">
							{selectedChar > 0 && getRandomAvatarsByCharacterId(selectedChar).map(av => {
								return (
									<>
										<div className="avatarContainer">
											<img key={av.id} className="avatarImage" src={av.imagePath} />
											<div>
												<input type="radio" key={av.imagePath} ref={radio} name="avatarRadio" value={av.id} onChange={e => setSelectedAv(e.target.value)} />
											</div>
										</div>
									</>
								)
							})}
							{selectedChar > 0 && getNonRandomAvatarsByCharacterId(selectedChar).map(av => {
								return (
									<>
										<div className="avatarContainer">

											<img key={av.id} className="avatarImage" src={av.imagePath} />
											<div>
												<input type="radio" key={av.imagePath} ref={radio} name="avatarRadio"
												value={av.id} onChange={e => setSelectedAv(e.target.value)} />
											</div>
										</div>
									</>
								)
							})}
						</div>
					</form>
					<div className="originalQuestion">
						Original Question:
					{q && <div>{q.message}</div>}
					</div>
					<div>
						<div>
							<label htmlFor="answer">Your response:</label>
						</div>
						{q && <textarea rows="8" cols="40" ref={response}></textarea>}
					</div>
					<button type="submit" className="btn btn-ask-question" onClick={evt => {
						evt.preventDefault()
						addNewAnswer();
					}}>Answer
        			</button>
				</div>
				<Footer />
			</>
		)
	} else {
		return <Redirect to="/login" />
	}
}