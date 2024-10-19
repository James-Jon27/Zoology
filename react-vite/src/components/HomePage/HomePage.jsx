import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { CATEGORIES, getAllCreatures } from "../../redux/creature";
import { SyncLoader } from "react-spinners";
import Categories from "./Categories";
import "./HomePage.css";

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
			<h1 style={{ color: "#c3c9cd", textAlign: "center", fontSize: "3rem" }}>
				Transporting to Containment Center
				<SyncLoader color="#c3c9cd" />
			</h1>
		);
	}

	if(category && !CATEGORIES.includes(category)) {
		return (
			<h1 style={{ color: "#c3c9cd", textAlign: "center", fontSize: "3rem" }}>
				{category} Is Not A Supported Category
			</h1>
		);
	}
	
	return (
		<div>
			{category ? (
				<div>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<h1 style={{ color: "#c3c9cd", textAlign: "center", fontSize: "3rem" }}>
							{category} Creatures
						</h1>
						<Categories />
					</div>
					<div id="liner" style={{ overflowY: "scroll", height: "70vh" }}>
						{creatures &&
							creatures
								.filter((creature) => creature.category === category)
								.reverse()
								.map((creature) => {
									return (
										<NavLink to={`/creature/${creature.id}`} key={creature.id} className="creature">
											<div className="cDetails">
												<h1>{creature.name}</h1>
												<p style={{ fontSize: "1.7rem" }}>{creature.description}</p>
											</div>
											<div className="cWhereAbouts">
												<h3
													onClick={(e) => {
														e.preventDefault(), nav(`/${creature.category}`);
													}}>
													{creature.category}, {creature.origin}
												</h3>
											</div>
										</NavLink>
									);
								})}
					</div>
				</div>
			) : (
				<div>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<h1 style={{ color: "#c3c9cd", textAlign: "center", fontSize: "3rem" }}>
							All Creatures
						</h1>
						<Categories />
					</div>
					<div id="liner" style={{ overflowY: "scroll", height: "70vh" }}>
						{creatures &&
							creatures.reverse().map((creature) => {
								return (
									<NavLink to={`/creature/${creature.id}`} key={creature.id} className="creature">
										<div className="cDetails">
											<h1>{creature.name}</h1>
											<p style={{ fontSize: "1.7rem" }}>{creature.description}</p>
										</div>
										<div className="cWhereAbouts">
											<h3
												onClick={(e) => {
													e.preventDefault(), nav(`/${creature.category}`);
												}}>
												{creature.category}, {creature.origin}
											</h3>
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
