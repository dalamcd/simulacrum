import React, { useContext, useRef } from "react";
import { AvatarContext } from "../avatars/AvatarProvider";
import { CharacterContext } from "./CharacterProvider";

export const CharacterForm = props => {

	const name = useRef(null);
	//const file = useRef(null);

	const { addAvatarImage, addAvatar } = useContext(AvatarContext);
	const { addCharacter, getCharacters } = useContext(CharacterContext)

	const addNewCharacter = () => {

		let characterId;
		const file = document.querySelector("#avatar").files;

		addCharacter({
			name: name.current.value,
			primary: false,
			global: false,
			userId: 1
		})
			.then(res => res.json())
			.then(res=> {
				characterId = res.id;
				addAvatarImage(file)
				.then(res => res.json())
					.then(data => {
						addAvatar({
							characterId,
							random: false,
							imagePath: data.url
						})
					})
			})
			.then(getCharacters)
	}

	return (
		<>
			<h2>Add A Character</h2>
			<div>
				<label htmlFor="name">Character name:</label>
				<input type="text" id="character__name" ref={name} placeholder="Enter character's name" name="name" />
			</div>
			<div>
				<label for="avatar">Choose a profile picture:</label>
				<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
			</div>
			<button type="submit" className="btn btn-ask-question" onClick={evt => {
				evt.preventDefault()
				addNewCharacter();
			}}>Add
        	</button>
		</>
	)
}