import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneCreature, removeACreature, saveACreature, unsaveACreature } from "../../redux/creature";
import OpenMarbleModal from "../MarbleModal/OpenMarbelModal";
import MarbleModal from "../MarbleModal";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { BounceLoader, SyncLoader } from "react-spinners";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import "./CreaturePage.css";
import { thunkAuthenticate } from "../../redux/session";

export default function CreaturePage() {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { id } = useParams();
	const [isLoading, setLoading] = useState(false);
	const sessionUser = useSelector((state) => state.session.user);
	const creatureSelect = useSelector((state) => state.creature);
	const creatures = Object.values(creatureSelect);
	const creature = creatures.find((creature) => creature.id == id);
	const [errors, setErrors] = useState({});
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		const fetchCreature = async () => {
			await dispatch(getOneCreature(id));
			setLoading(true);
		};
		if (!isLoading) {
			fetchCreature();
		}
	}, [dispatch, isLoading, setLoading, id]);

	const handleDelete = async (e) => {
		e.preventDefault();

		const res = await dispatch(removeACreature(id));
		if (res) {
			setErrors(res);
			return errors;
		}
		return nav("/");
	};

	if (!isLoading || !creature) {
		return (
			<h1 style={{ textAlign: "center", fontSize: "3rem" }}>
				Transporting to Creature
				<SyncLoader />
			</h1>
		);
	}

	const saved = () => {
		if (!sessionUser || !sessionUser.saved) {
			return false
		}
		return sessionUser.saved.some((creature) => creature.id == id)
	}
	console.log(saved())
	
	const save = async (e) => {
		e.preventDefault()

		setSaving(true)
		await dispatch(saveACreature(id))
		await dispatch(thunkAuthenticate())
		setSaving(false)
	}
	
	const unsave = async (e) => {
		e.preventDefault()
		
		setSaving(true)
		await dispatch(unsaveACreature(id))
		await dispatch(thunkAuthenticate())
		setSaving(false)
	}

	const savingCreature = (bool) => {
		if (saving) {
			return (
				<div className="saving">
					<BounceLoader size="30px"/>
				</div>
			);
		} else if (!bool) {
			return (
				<div className="saving" >
					<CiCirclePlus onClick={save} style={{height: "30px", width: "30px",padding: "0", margin: "0", color: "#FFD899"}}/>
				</div>
			);
		} else if (bool) {
			return (
				<div className="saving">
					<CiCircleMinus onClick={unsave} style={{ height: "30px", width: "30px",padding: "0", margin: "0", color: "#FFD899" }} />
				</div>
			);
		}
	};

	return (
		<div>
			{sessionUser && savingCreature(saved())}
			<div className="creatureInfo">
				<div className="creatureImage">
					<img src={creature.image} alt={creature.name} />
				</div>
				<div className="creatureData">
					<div>
						<h1 style={{ borderBottom: "solid 3px #CC7E00" }}>{creature.name}</h1>
					</div>
					<div className="desc" style={{ fontSize: "1.5rem" }}>
						{creature.description}
					</div>
					<div>
						<h4
							onClick={(e) => {
								e.preventDefault(), nav(`/${creature.category}`);
							}}
							style={{ cursor: "pointer" }}>
							{creature.category}, {creature.origin}
						</h4>
					</div>
				</div>
			</div>
			{sessionUser && sessionUser.id === creature.userId && (
				<div className="creatureManipulation">
					<button
						style={{
							border: "none",
							cursor: "pointer",
							margin: "15px",
							background: "none",
							color: "#ffd899",
						}}
						onClick={handleDelete}>
						<MdDelete style={{ width: "40px", height: "40px" }} />
					</button>
					<button
						style={{
							border: "none",
							cursor: "pointer",
							margin: "15px",
							background: "none",
							color: "#ffd899",
						}}
						onClick={(e) => {
							e.preventDefault(), nav(`/creature/${creature.id}/edit`);
						}}>
						<MdEditSquare style={{ width: "40px", height: "40px" }} />
					</button>
				</div>
			)}
			<div className="creatureLore">
				{creature.lore.length ? (
					<div className="marbleContainer">
						{creature.lore.map((marble) => {
							return (
								<div key={marble.id}>
									<OpenMarbleModal
										modalComponent={<MarbleModal marbleId={marble.id} />}
										marble={marble}
									/>
								</div>
							);
						})}
					</div>
				) : (
					<div style={{ display: "flex", flexDirection: "column" }}>
						<h1 style={{ textAlign: "center", fontSize: "3rem" }}>No Lore Posted...</h1>
					</div>
				)}
			</div>
			{sessionUser && (
				<button
					className="cButton"
					style={{
						justifyContent: "center",
						fontSize: "2rem",
						cursor: "pointer",
						background: "none",
						border: "none",
						color: "#ffc466",
						width: "100%",
						marginBottom: "20px",
					}}
					onClick={(e) => {
						e.preventDefault();
						nav("lore");
					}}>
					Add Some Lore
				</button>
			)}
		</div>
	);
}
