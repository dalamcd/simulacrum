import React, { useContext, useEffect, useState } from "react"
import { AnswerContext } from "../answers/AnswerProvider";
import { AvatarContext } from "../avatars/AvatarProvider";
import { CharacterContext } from "../characters/CharacterProvider";
import { QuestionContext } from "./QuestionProvider"
import { NavBar } from "../nav/NavBar";
import { Footer } from "../nav/Footer";
import "./Question.css"

export const Question = props => {

	const { getQuestions, getQuestionById } = useContext(QuestionContext);
	const { answers, getAnswers, getAnswersForQuestionById, deleteAnswer } = useContext(AnswerContext);
	const { getCharacters, getCharacterById } = useContext(CharacterContext);
	const { getAvatars, getAvatarById } = useContext(AvatarContext);

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
				<>
				<div className="main">
					{localStorage.getItem("app_user_id") ?
						<NavBar links={[{ to: "/", text: "Home" }, { to: "/questions", text: "View All Questions" },
						{ to: `/answer/${props.match.params.questionId}`, text: "Answer Question" }]} /> :
						<NavBar links={[{ to: "/", text: "Home" }, { to: "/questions", text: "View All Questions" }]} />
					}
					<div className="container">
						<div className="question">
							<div className="questionContainer">
								<div className="visitorAvatar">
									<img className="visitorAvatarImage" src="/images/visitor.jpg" />
								</div>
								<div className="questionTextContainer">
									<div className="question__name">
										<span className="question__visitorName">{question.visitorName}</span> asks
							a question of: <span className="question__characterName">{getCharacterById(question.characterId).name}</span>
									</div>
									<div className="question__text">
										{question.message}
									</div>
								</div>
							</div>
						</div>
						<div className="question__responses">
							{qAnswers.map(qa => qa ?
								<div key={qa.id} className="question__response">
									<div className="question__characterContainer">
										<div className="question__avatar">
											<img className="question__avatar__image" src={getAvatarById(qa.avatarId).imagePath} />
										</div>
										<div className="question__avatar__name">
											{getCharacterById(qa.characterId).name}
										</div>
									</div>
									<div className="question__response__text">
										{qa.response}
									</div>
									<div className="flavorText">
										<span className="flavorText__item">Node count: {Math.floor(((Math.random() * 90) + 10))}</span>
										<span className="flavorText__item">Node depth: {((Math.random() * 90) + 10).toFixed(2)}%</span>
										<span className="flavorText__item">Resonanace frequency: {((Math.random() * 90) + 10).toFixed(2)} dBa</span>
									</div>
									<div className="buttonDiv">
										{localStorage.getItem("app_user_id") && <button className="deleteButton" onClick={() => deleteAnswer(qa.id)}>Delete</button>}
									</div>
								</div> : "")
							}
						</div>
					</div>
				</div>
				<Footer />
				</>
			)
		}
	}

	return (
		<>
			{listQuestion(question)}
		</>
	)
}