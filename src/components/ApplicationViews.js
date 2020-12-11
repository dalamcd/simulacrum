import React from "react";
import { Route } from "react-router-dom";
import { QuestionForm } from "./questions/QuestionForm";
import { AnswerProvider } from './answers/AnswerProvider';
import { CharacterProvider } from './characters/CharacterProvider';
import { QuestionProvider } from './questions/QuestionProvider';
import { AvatarProvider } from "./avatars/AvatarProvider";
import { CharacterForm } from "./characters/CharacterForm";
import { Simulacrum } from "./Simulacrum";
import { QuestionList } from "./questions/QuestionList";
import { Question } from "./questions/Question";
import { Admin } from "./admin/Admin";
import { Login } from "./auth/Login"
import { AnswerForm } from "./answers/AnswerForm"

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
			<CharacterProvider>
				<AnswerProvider>
					<QuestionProvider>
						<AvatarProvider>
							<Route exact path="/questions/:questionId(\d+)" render={
								props => <Question {...props} />
							} />
						</AvatarProvider>
					</QuestionProvider>
				</AnswerProvider>
			</CharacterProvider>
			<QuestionProvider>
				<AnswerProvider>
					<Route exact path="/questions" render={
						props => <QuestionList {...props} />
					} />
				</AnswerProvider>
			</QuestionProvider>
			<CharacterProvider>
				<AvatarProvider>
					<Route exact path="/add" render={
						props => <CharacterForm {...props} />
					} />
				</AvatarProvider>
			</CharacterProvider>
			<AvatarProvider>
				<CharacterProvider>
					<QuestionProvider>
						<AnswerProvider>
							<Route exact path="/answer/:questionId(\d+)" render={
								props => <AnswerForm {...props} />
							} />
						</AnswerProvider>
					</QuestionProvider>
				</CharacterProvider>
			</AvatarProvider>
			<Route exact path="/admin" render={
				props => <Admin {...props} />
			} />
			<Route exact path="/login" render={
				props => <Login {...props} />
			} />
		</>
	)
}