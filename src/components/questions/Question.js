import React, { useContext, useEffect } from "react"
import { AnswerContext } from "../answers/AnswerProvider";
import { AvatarContext } from "../avatars/AvatarProvider";
import { CharacterContext } from "../characters/CharacterProvider";
import { QuestionContext } from "./QuestionProvider"
import "./Question.css"

export const Question = props => {

	const { getQuestions, getQuestionById } = useContext(QuestionContext);
	const { answers, getAnswers, getAnswersForQuestionById } = useContext(AnswerContext);
	const { getCharacters, getCharacterById } = useContext(CharacterContext);
	const { getAvatars, getAvatarByCharacterId } = useContext(AvatarContext);

	useEffect(() => {
		getCharacters()
			.then(getAvatars)
			.then(getAnswers)
			.then(getQuestions);
	}, [])

	const question = getQuestionById(props.match.params.questionId);

	const listQuestion = q => {
		if (q) {
			const answerRels = getAnswersForQuestionById(q.id);
			const qAnswers = answerRels.map(ar => {
				if (ar.questionId === q.id)
					return answers.find(a => a.id === ar.id);
			})

			return (
				<div>
					<div className="questionTitle">
						{question.message}
					</div>
					<div className="questionResponses">{qAnswers.map(qa =>
						<div key={qa.id} className="questionResponse">
							<div className="question__characterContainer">
							<img className="questionAvatar" src={getAvatarByCharacterId(qa.characterId).imagePath} />
							<div>
								{getCharacterById(qa.characterId).name}
							</div>
							</div>
							<div>
								{qa.response}
							</div>
						</div>)}
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