import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { CATEGORIES, getAllCreatures } from "../../redux/creature";
import "./HomePage.css";
import { SyncLoader } from "react-spinners";

export default function HomePage() {
	const dispatch = useDispatch();
	const nav = useNavigate()
	const creatureSelect = useSelector((state) => state.creature);
	const creatures = Object.values(creatureSelect);
	const [isLoading, setLoading] = useState(false);
	const { category } = useParams();

	useEffect(() => {
		if (!isLoading) {
			dispatch(getAllCreatures());
			setLoading(true);
		}
	}, [dispatch, setLoading, isLoading]);

	if (!isLoading) {
		return (
			<h1 style={{ color: "#FFC466", textAlign: "center", fontSize: "3rem" }}>
				Transporting to Containment Center<SyncLoader/>
			</h1>
		);
	}

	if(category && !CATEGORIES.includes(category)) {
		return <h1 style={{ color: "#FFC466", textAlign: "center", fontSize: "3rem" }}>
			{category} Is Not A Supported Category
		</h1>
	}
	
	return (
		<div>
			{category ? (
				<div>
					<h1 style={{ color: "#FFC466", textAlign: "center", fontSize: "3rem" }}>
						{category} Creatures
					</h1>
					<div id="liner" style={{ overflowY: "scroll", height: "75vh" }}>
						{creatures &&
							creatures
								.filter((creature) => creature.category === category)
								.map((creature) => {
									return (
										<NavLink to={`/creature/${creature.id}`} key={creature.id} className="creature">
											<div className="cImage">
												<img src={creature.image} alt={`Image of ${creature.name}`} />
											</div>
											<div className="cDetails">
												<h1>{creature.name}</h1>
												<p style={{ fontSize: "1.7rem" }}>{creature.description}</p>
											</div>
											<div className="cWhereAbouts">
												<h3 onClick={(e) => {e.preventDefault(), nav(`/${creature.category}`)}}>{creature.category}</h3>
												<h3>{creature.origin}</h3>
											</div>
										</NavLink>
									);
								})}
					</div>
				</div>
			) : (
				<div>
					<h1 style={{ color: "#FFC466", textAlign: "center", fontSize: "3rem" }}>All Creatures</h1>
					<div id="liner" style={{ overflowY: "scroll", height: "75vh" }}>
						{creatures &&
							creatures.map((creature) => {
								return (
									<NavLink to={`/creature/${creature.id}`} key={creature.id} className="creature">
										<div className="cImage">
											<img src={creature.image} alt={`Image of ${creature.name}`} />
										</div>
										<div className="cDetails">
											<h1>{creature.name}</h1>
											<p style={{ fontSize: "1.7rem" }}>{creature.description}</p>
										</div>
										<div className="cWhereAbouts">
											<h3 onClick={(e) => {e.preventDefault(), nav(`/${creature.category}`)}}>{creature.category}</h3>
											<h3>{creature.origin}</h3>
										</div>
									</NavLink>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
}
