import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {getOneCreature, updateACreature } from "../../redux/creature";
import "./UploadCreature.css";

export default function UpdateCreature() {
	const dispatch = useDispatch();
	const nav = useNavigate();
    const {id} = useParams();
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [origin, setOrigin] = useState("");
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState({});
	const sessionUser = useSelector((state) => state.session.user);
    const creature = useSelector(state => state.creature[id])

    useEffect(() => {
        const fetchCreature = async () => {
            await dispatch(getOneCreature(id))

            if(creature) {
                setName(creature.name)
                setDescription(creature.description)
                setOrigin(creature.origin)
                setCategory(creature.category)
            }
            setLoading(false)
        }

        if(isLoading) {
            fetchCreature()
        }
     }, [dispatch, creature, id, isLoading])

	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = new FormData();
		form.append("name", name);
		form.append("category", category);
		form.append("description", description);
		form.append("origin", origin);

		const res = await dispatch(updateACreature(id, form));
		if (res.errors) {
			setErrors(res.errors);
			return errors;
		} else {
            await dispatch(getOneCreature(id))
			return nav(`/creature/${id}`);
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

	if (!creature || isLoading) {
		return (
			<h1
				style={{
					textAlign: "center",
					fontSize: "3rem",
					color: "#c3c9cd",
				}}>
				Containing Creature...
			</h1>
		);
	}

	return (
		<div>
			<h1 style={{ color: "#c3c9cd", textAlign: "center", fontSize: "3rem" }}>Retcon Creature</h1>
			<form className="creatureForm" onSubmit={handleSubmit}>
				{errors.name && <p style={{ color: "#c3c9cd" }}>{errors.name}</p>}
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
				{errors.category && <p style={{ color: "#c3c9cd" }}>{errors.category}</p>}
				<label className="categoryInput">
					<select
						name="category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required>
						<option value="">Please Select a Category</option>
						<option value="Mythological" selected={category === "Mythological"}>
							Mythological
						</option>
						<option value="Creepypasta" selected={category === "Creepypasta"}>
							Creepypasta
						</option>
						<option value="Cryptid" selected={category === "Cryptid"}>
							Cryptid
						</option>
						<option value="Folklore" selected={category === "Folklore"}>
							Folklore
						</option>
						<option value="SCP" selected={category === "SCP"}>
							SCP
						</option>
						<option value="Other" selected={category === "Other"}>
							Other
						</option>
					</select>
				</label>
				{errors.description && <p style={{ color: "#c3c9cd" }}>{errors.description}</p>}
				<label className="descInput">
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Description/Attributes"
						required
						maxLength="999"
					/>
				</label>
				{errors.origin && <p style={{ color: "#c3c9cd" }}>{errors.origin}</p>}
				<label className="originInput">
					<input
						required
						value={origin}
						onChange={(e) => setOrigin(e.target.value)}
						placeholder="Origin"
						maxLength="75"
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
					Update
				</button>
			</form>
		</div>
	);
}
