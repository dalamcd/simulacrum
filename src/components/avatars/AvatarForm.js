import React, { useContext, useEffect, useRef } from "react"
import { Redirect } from "react-router-dom"
import { CharacterContext } from "../characters/CharacterProvider";
import { NavBar } from "../nav/NavBar";
import { AvatarContext } from "./AvatarProvider"
import "./Avatar.css"
import { Footer } from "../nav/Footer";

export const AvatarForm = () => {

	const { addAvatar, addAvatarImage, getAvatars } = useContext(AvatarContext);
	const { characters, getCharacters } = useContext(CharacterContext);

	const random = useRef();
	const char = useRef();
	const f = useRef();
	const form = useRef();

	useEffect(() => {
		getCharacters();
	}, [])

	const addNewAvatar = () => {

		if (!f.current.files[0]) {
			window.alert("Please include an image.")
		} else {
			addAvatarImage(f.current.files)
				.then(res => res.json())
				.then(data => {
					addAvatar({
						characterId: parseInt(char.current.value),
						random: random.current.checked,
						imagePath: data.url
					})
				})
				.then(getAvatars)
				.then(() => form.current.reset())
		}

	}
	if (localStorage.getItem("app_user_id")) {
		return (
			<>
				<NavBar links={[{ to: "/", text: "Ask A Question" },
				{ to: "/questions", text: "View All Questions" }, { to: "/add", text: "Add A Character" }]} />
				<h2>Add An Avatar</h2>
				<form id="addAvatarForm" ref={form}>
					<div className="addAvatarFields">
						<div className="selectCharacterField">
							<label htmlFor="name">Character:</label>
							<select ref={char}>
								{characters.map(c => {
									if ((c.global || c.userId === parseInt(localStorage.getItem("app_user_id")) && c.id !== 1))
										return <option key={c.id} value={c.id}>{c.name}</option>
								})}
							</select>
						</div>
						<div className="randomAvatar">
							<label htmlFor="randomAvatar">Random Avatar</label>
							<input type="checkbox" id="randomAvatar" value="Primary" ref={random} defaultChecked />
						</div>
						<div className="fileUploadField">
							<label htmlFor="avatar">Profile picture:</label>
							<input ref={f} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
						</div>
						<button type="submit" className="btn btn-add-avatar" onClick={evt => {
							evt.preventDefault()
							addNewAvatar();
						}}>Add
        	</button>
					</div>
				</form>
				<Footer />
			</>
		)
	} else {
		return <Redirect to="/login" />
	}
}