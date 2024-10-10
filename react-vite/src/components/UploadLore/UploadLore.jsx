import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { postMarble } from "../../redux/lore";
import "./UploadLore.css";

export default function UploadLore() {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [story, setStory] = useState("");
	const [errors, setErrors] = useState({});
	const sessionUser = useSelector((state) => state.session.user);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("title", title);
		formData.append("story", story);

		const res = await dispatch(postMarble(id, formData));
		if (res) {
			setErrors(res);
			return errors;
		} else {
			nav(`/creature/${id}`);
		}
	};

	const disabled = () => {
		if (
			title.length < 1 ||
			title.length > 50 ||
			story.length < 1 ||
			story.length > 9999 ||
			!sessionUser ||
			!errors
		) {
			return true;
		}
		return false;
	};

	return (
		<div className="addPage">
			<h1 style={{ color: "#c3c9cd" }}>Add To The Lore</h1>
			<form className="mForm" onSubmit={handleSubmit}>
				{title.length > 49 && (
					<p style={{ color: "#c3c9cd" }}>Title can not be longer than 50 characters.</p>
				)}
				{errors.title && <p style={{ color: "#c3c9cd" }}>{errors.title}</p>}
				<label className="mTitle">
					<input
						type="text"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</label>
				{story.length > 9999 && (
					<p style={{ color: "#c3c9cd" }}>Story can not be longer than 9,999 characters.</p>
				)}
				{errors.story && <p style={{ color: "#c3c9cd" }}>{errors.story}</p>}
				<label className="mStory">
					<textarea
						placeholder="Story"
						value={story}
						onChange={(e) => setStory(e.target.value)}
						maxLength="9999"
						required
					/>
				</label>
				<button
					className="mButton"
					style={{
						justifyContent: "center",
						fontSize: "1.25rem",
						background: "none",
						border: "none",
						width: "100%",
					}}
					type="submit"
					disabled={disabled()}>
					Post a New Marble
				</button>
			</form>
		</div>
	);
}
