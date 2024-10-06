import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { putMarble } from "../../redux/lore";
import "./UploadLore.css";

export default function UpdateLore() {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { id } = useParams();
	const sessionUser = useSelector((state) => state.session.user);
    const marbles = useSelector(state => state.lore)
    const marble = marbles[id]
	const [title, setTitle] = useState(marble.title);
	const [story, setStory] = useState(marble.story);
	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("title", title);
		formData.append("story", story);

		const res = await dispatch(putMarble(id, formData));
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
			<h1>Add To The Lore</h1>
			<form className="mForm" onSubmit={handleSubmit}>
				{title.length > 49 && (
					<p style={{ color: "#FF9F00" }}>Title can not be longer than 50 characters.</p>
				)}
				{errors.title && <p style={{ color: "#FF9F00" }}>{errors.title}</p>}
				<label className="mTitle">
					<input
						type="text"
						placeholder="Title"
                        value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</label>
				{errors.story && <p style={{ color: "#FF9F00" }}>{errors.story}</p>}
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
