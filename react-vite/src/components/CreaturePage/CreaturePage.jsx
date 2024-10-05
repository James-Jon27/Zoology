import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneCreature } from "../../redux/creature";
import OpenMarbleModal from "../MarbleModal/OpenMarbelModal";
import MarbleModal from "../MarbleModal";
import "./CreaturePage.css";

export default function CreaturePage() {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { id } = useParams();
	const [isLoading, setLoading] = useState(false);
    const sessionUser = useSelector(state => state.session.user)
	const creatureSelect = useSelector((state) => state.creature);
	const creatures = Object.values(creatureSelect);
	const creature = creatures.find((creature) => creature.id == id);

	useEffect(() => {
        const fetchCreature = async () => {
            await dispatch(getOneCreature(id));
            setLoading(true);

        }
		if (!isLoading) {
            fetchCreature()
		}
	}, [dispatch, isLoading, setLoading, id]);

	if (!isLoading || !creature) {
		return <h1 style={{ textAlign: "center", fontSize: "3rem" }}>Transporting to Creature...</h1>;
	}

	return (
		<div>
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
							style={{cursor: "pointer"}}
							>
							{creature.category}, {creature.origin}
						</h4>
					</div>
				</div>
			</div>
			<div className="creatureLore">
				{creature.lore.length ? (
					<div className="marbleContainer">
						{creature.lore.map((marble) => {
							return (
								<div key={marble.id}>
									<OpenMarbleModal
										modalComponent={<MarbleModal id={marble.id} />}
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
					}}>
					Add Some Lore
				</button>
			)}
		</div>
	);
}
