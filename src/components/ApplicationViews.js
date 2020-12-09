import React from "react"
import { Route } from "react-router-dom"
import { QuestionForm } from "./questions/QuestionForm"
import { AnswerProvider } from './answers/AnswerProvider';
import { CharacterProvider } from './characters/CharacterProvider';
import { QuestionProvider } from './questions/QuestionProvider';
import { Simulacrum } from "./Simulacrum"
import { QuestionList } from "./questions/QuestionList";

export const ApplicationViews = props => {

	return (
		<>
			<CharacterProvider>
				<AnswerProvider>
					<QuestionProvider>
						<Route exact path="/" render={
							props => <Simulacrum {...props} />} />
						<Route exact path="/ask" render={
							props => <QuestionForm {...props} />
						} />
					</QuestionProvider>
				</AnswerProvider>
			</CharacterProvider>
			<QuestionProvider>
				<Route exact path="/questions" render={
					props => <QuestionList {...props} />
				} />
			</QuestionProvider>
		</>
	)
}