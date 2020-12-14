import React, { useContext, useEffect, useRef } from "react"
import { Redirect } from "react-router-dom"
import { CharacterContext } from "../characters/CharacterProvider";
import { NavBar } from "../nav/NavBar";
import { AvatarContext } from "./AvatarProvider"

export const AvatarForm = () => {

	const { addAvatar, addAvatarImage, getAvatars } = useContext(AvatarContext);
	const { characters, getCharacters } = useContext(CharacterContext);

	const random = useRef();
	const char = useRef();

	useEffect(() => {
		getCharacters();
	}, [])

	const addNewAvatar = () => {

		const file = document.querySelector("#avatar").files;

		if (!file[0]) {
			window.alert("Please include an image.")
		} else {
			addAvatarImage(file)
				.then(res => res.json())
				.then(data => {
					addAvatar({
						characterId: parseInt(char.current.value),
						random: random.current.checked,
						imagePath: data.url
					})
				})
				.then(getAvatars)
				.then(() => document.getElementById("addAvatarForm").reset())
		}

	}
	if (localStorage.getItem("app_user_id")) {
		return (
			<>
				<NavBar links={[{ to: "/", text: "Ask A Question" }, { to: "/questions", text: "View Questions" },
				{ to: "/add", text: "Add a Character" }]} />
				<h2>Add An Avatar</h2>
				<form id="addAvatarForm">
					<div>
						<label htmlFor="name">Character:</label>
						<select ref={char}>
							{characters.map(c => {
								if ((c.global || c.userId === parseInt(localStorage.getItem("app_user_id")) && c.id !== 1))
									return <option key={c.id} value={c.id}>{c.name}</option>
							})}
						</select>
						<label htmlFor="randomAvatar">Random Avatar</label>
						<input type="checkbox" id="randomAvatar" value="Primary" ref={random} defaultChecked />
					</div>
					<div>
						<label htmlFor="avatar">Choose a profile picture:</label>
						<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
					</div>
					<button type="submit" className="btn btn-add-avatar" onClick={evt => {
						evt.preventDefault()
						addNewAvatar();
					}}>Add
        	</button>
				</form>
			</>
		)
	} else {
		return <Redirect to="/login" />
	}
}