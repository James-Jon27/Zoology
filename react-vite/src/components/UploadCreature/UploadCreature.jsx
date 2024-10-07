import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addACreature } from "../../redux/creature";
import "./UploadCreature.css";

export default function UploadCreature() {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [origin, setOrigin] = useState("");
	const [image, setImage] = useState();
	const [isLoading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const sessionUser = useSelector((state) => state.session.user);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = new FormData();
		form.append("name", name);
		form.append("category", category);
		form.append("description", description);
		form.append("origin", origin);
		form.append("image", image);

		setLoading(true);
		const res = await dispatch(addACreature(form));
		if (res.errors) {
			setErrors(res.errors);
			console.log(errors);
			setLoading(false);
			return errors;
		} else {
			nav(`/creature/${res.id}`);
		}
	};

	const disabled = () => {
		if (
			!name ||
			!category ||
			!description ||
			description.length > 1000 ||
			!origin ||
			!sessionUser
		) {
			return true;
		}
		return false;
	};

	return (
		<div>
			<h1 style={{ color: "#FFC466", textAlign: "center", fontSize: "3rem" }}>Upload Creature</h1>
			<form className="creatureForm" onSubmit={handleSubmit} encType="multipart/form-data">
				{errors.name && <p style={{ color: "#FF9F00" }}>{errors.name}</p>}
				<label className="nameInput">
					<input
						type="name"
						placeholder="Name"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						required
                        maxLength="60"
					/>
				</label>
				{errors.category && <p style={{ color: "#FF9F00" }}>{errors.category}</p>}
				<label className="categoryInput">
					<select
						name="category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required>
						<option value="">Please Select a Category</option>
						<option value="Mythological">Mythological</option>
						<option value="Creepypasta">Creepypasta</option>
						<option value="Cryptid">Cryptid</option>
						<option value="Folklore">Folklore</option>
						<option value="SCP">SCP</option>
						<option value="Other">Other</option>
					</select>
				</label>
				{errors.description && <p style={{ color: "#FF9F00" }}>{errors.description}</p>}
				<label className="descInput">
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Description/Attributes"
						required
						maxLength="999"
					/>
				</label>
				{errors.origin && <p style={{ color: "#FF9F00" }}>{errors.origin}</p>}
				<label className="originInput">
					<input
						required
						value={origin}
						onChange={(e) => setOrigin(e.target.value)}
						placeholder="Origin"
					/>
				</label>
				{errors.image && <p style={{ color: "#FF9F00" }}>{errors.image}</p>}
				<label className="imageInput">
					<input
						onChange={(e) => setImage(e.target.files[0])}
						type="file"
						accept="image/*"
						required
					/>
				</label>
				<button
					className="cPButton"
					style={{
						justifyContent: "center",
						fontSize: "1.25rem",
						background: "none",
						border: "none",
						width: "100%",
					}}
					disabled={disabled()}
					type="submit">
					Add to the Zoo
				</button>
				{isLoading && <p>Loading...</p>}
			</form>
		</div>
	);
}
