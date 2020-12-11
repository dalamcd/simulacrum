import React, { useContext, useEffect, useState } from "react"
import { AnswerContext } from "../answers/AnswerProvider";
import { AvatarContext } from "../avatars/AvatarProvider";
import { CharacterContext } from "../characters/CharacterProvider";
import { QuestionContext } from "./QuestionProvider"
import "./Question.css"
import { NavBar } from "../nav/NavBar";

export const Question = props => {

	const { getQuestions, getQuestionById } = useContext(QuestionContext);
	const { answers, getAnswers, getAnswersForQuestionById, deleteAnswer } = useContext(AnswerContext);
	const { getCharacters, getCharacterById } = useContext(CharacterContext);
	const { getAvatars, getAvatarByCharacterId } = useContext(AvatarContext);

	const [update, setUpdate] = useState([])

	useEffect(() => {
		getCharacters()
			.then(getAvatars)
			.then(getAnswers)
			.then(getQuestions)
	}, [])

	useEffect(() => {
		setUpdate(answers)
	}, [answers])

	const question = getQuestionById(props.match.params.questionId);

	const listQuestion = q => {
		if (q) {
			const answerRels = getAnswersForQuestionById(q.id);
			const qAnswers = answerRels.map(ar => {
				if (ar.questionId === q.id) {
					return update.find(a => a.id === ar.id);
				}
			})

			return (
				<div>
					{localStorage.getItem("app_user_id") ? 
					<NavBar links={[{ to: "/", text: "Home" }, { to: "/questions", text: "View Questions" },
					{to: `/answer/${props.match.params.questionId}`, text: "Answer Question"}]} /> :
					<NavBar links={[{ to: "/", text: "Home" }, { to: "/questions", text: "View Questions" }]} /> 
			}
					<div className="question">
						<div className="question__name">
							{question.visitorName} asks a question of {getCharacterById(question.characterId).name}:
					</div>
						<div className="question__text">
							{question.message}
						</div>
					</div>
					<div className="question__responses">
						{qAnswers.map(qa => qa ?
						<div key={qa.id} className="question__response">
							<div className="question__characterContainer">
								<div className="question__avatar">
								<img className="question__avatar__image" src={getAvatarByCharacterId(qa.characterId).imagePath} />
								</div>
								<div className="question__avatar__name">
									{getCharacterById(qa.characterId).name}
								</div>
							</div>
							<div className="question__response__text">
								{qa.response}
								{localStorage.getItem("app_user_id") && <button onClick={() => deleteAnswer(qa.id)}>Delete</button>}
							</div>
						</div> : "")
						}
					</div>
				</div>
			)
		}
	}

	return (
		<>
			{listQuestion(question)}
			{/* {question ? question.message : ""} */}
			{/* {qAnswers.map(qa => qa.response)} */}
		</>
	)
}