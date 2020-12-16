import React, { useContext, useRef } from "react";
import { Redirect } from "react-router-dom"
import { AvatarContext } from "../avatars/AvatarProvider";
import { NavBar } from "../nav/NavBar";
import { CharacterContext } from "./CharacterProvider";

export const CharacterForm = props => {

	const name = useRef();
	const primary = useRef();
	const global = useRef();
	const form = useRef();
	const f = useRef()

	const { addAvatarImage, addAvatar, getAvatars } = useContext(AvatarContext);
	const { addCharacter, getCharacters } = useContext(CharacterContext)


	const addNewCharacter = () => {

		let characterId;

		if (name.current.value === "") {
			window.alert("Please include a name.")
		} else if (!f.current.files[0]) {
			window.alert("Please include an image.")
		} else {
			addCharacter({
				name: name.current.value,
				primary: primary.current.checked,
				global: global.current.checked,
				userId: parseInt(localStorage.getItem("app_user_id"))
			})
				.then(res => res.json())
				.then(res => {
					characterId = res.id;
					addAvatarImage(f.current.files)
						.then(res => res.json())
						.then(data => {
							addAvatar({
								characterId: parseInt(characterId),
								random: true,
								imagePath: data.url
							})
						})
				})
				.then(getCharacters)
				.then(getAvatars)
				.then(() => form.current.reset())
		}

	}
	if (localStorage.getItem("app_user_id")) {
		return (
			<>
				<NavBar links={[{ to: "/", text: "Ask A Question" }]} />
				<h2>Add A Character</h2>
				<form id="addCharacterForm" ref={form}>
					<div>
						<label htmlFor="name">Character name:</label>
						<input type="text" id="character__name" ref={name} placeholder="Enter character's name" name="name" />
						<label htmlFor="primaryChar">Primary Character</label>
						<input type="checkbox" id="primaryChar" value="Primary" ref={primary} />
						<label htmlFor="globalChar">Global Character</label>
						<input type="checkbox" id="globalChar" value="Global" ref={global} />
					</div>
					<div>
						<label htmlFor="avatar">Choose a profile picture:</label>
						<input type="file" ref={f} id="avatar" name="avatar" accept="image/png, image/jpeg" />
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