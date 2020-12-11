import React, { useContext, useRef } from "react";
import { Redirect } from "react-router-dom"
import { AvatarContext } from "../avatars/AvatarProvider";
import { NavBar } from "../nav/NavBar";
import { CharacterContext } from "./CharacterProvider";

export const CharacterForm = props => {

	const name = useRef(null);
	const primary = useRef(null);

	const { addAvatarImage, addAvatar, getAvatars } = useContext(AvatarContext);
	const { addCharacter, getCharacters } = useContext(CharacterContext)

	
	const addNewCharacter = () => {

		let characterId;
		const file = document.querySelector("#avatar").files;
		console.log(primary);

		addCharacter({
			name: name.current.value,
			primary: primary.current.checked,
			global: false,
			userId: parseInt(localStorage.getItem("app_user_id"))
		})
			.then(res => res.json())
			.then(res => {
				characterId = res.id;
				addAvatarImage(file)
					.then(res => res.json())
					.then(data => {
						addAvatar({
							characterId: parseInt(characterId),
							random: false,
							imagePath: data.url
						})
					})
			})
			.then(getCharacters)
			.then(getAvatars)
			.then(() => document.getElementById("addCharacterForm").reset())

	}
	if (localStorage.getItem("app_user_id")) {
		return (
			<>
			<NavBar links={[{to: "/", text: "Ask A Question"}]} />
				<h2>Add A Character</h2>
				<form id="addCharacterForm">
					<div>
						<label htmlFor="name">Character name:</label>
						<input type="text" id="character__name" ref={name} placeholder="Enter character's name" name="name" />
						<label htmlFor="primaryChar">Global Character</label>
						<input type="checkbox" id="primaryChar" value="Primary" ref={primary} />
					</div>
					<div>
						<label htmlFor="avatar">Choose a profile picture:</label>
						<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
					</div>
					<button type="submit" className="btn btn-ask-question" onClick={evt => {
						evt.preventDefault()
						addNewCharacter();
					}}>Add
        	</button>
				</form>
			</>
		)
	} else {
		return <Redirect to="/login" />
	}
}